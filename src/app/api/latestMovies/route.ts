import { NextRequest } from "next/server";
import { JSDOM } from "jsdom";
import axios from "axios";
import joinImages from "join-images";
import sharp from "sharp";

export type Movie = {
  title: string | undefined | null;
  link: string | null;
  pubDate: Date | null;
  id: number;
  posterUrl: string;
};

async function downloadImageAsBuffer(url: string) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
    return null;
  }
}

function getColumn(movieCount: number){
  const isEven = movieCount % 2 == 0;
  let columnSize = 6;
  if(movieCount > 28)
    columnSize = 7;
  if(isEven){
    while((movieCount % columnSize != 0 && (columnSize != movieCount/columnSize)) && !(columnSize >= 6 && movieCount % columnSize > Math.floor(movieCount / columnSize))){
      //console.log('columnSize=' + columnSize);
      columnSize++;
    }
  } else{
    //columnSize = 5;
    while (movieCount % columnSize != columnSize - 1 && movieCount % columnSize != columnSize - 3){
      columnSize++;
    }
  }
  return columnSize;
}

async function compressImage(img: Buffer<ArrayBufferLike>){
  const compressedImage = await sharp(img).resize(300, 450, {
    fit: 'cover'
  }).jpeg({quality: 80})
  .toBuffer();

  return compressedImage;
}

async function joinImagesFromBuffer(validBuffers: Buffer<ArrayBufferLike>[]) {

  let img: sharp.Sharp | undefined = undefined;
  const compressedBuffers = await Promise.all(validBuffers.map(compressImage));
  if(compressedBuffers.length < 5){
      img = await joinImages(compressedBuffers, {
        direction: 'horizontal'
      });
  } else{
    //const evenSize = compressedBuffers.length % 2 == 0;
    
    const slices: Array<Buffer<ArrayBufferLike>> = [];
    let lastIndex: number = 0;
    const columns = compressedBuffers.length > 18 ? /*Math.ceil(compressedBuffers.length/4)*/getColumn(compressedBuffers.length) : 4;
    //let columns = compressedBuffers.length/4;
    for(let i=0; i<compressedBuffers.length; i = i+columns){
      //console.log(i, compressedBuffers.length);
      if(i+columns-1 > compressedBuffers.length - 1) lastIndex = compressedBuffers.length
      else lastIndex = i+columns
      const row = await joinImages(compressedBuffers.slice(i, lastIndex), {
        direction:'horizontal'
      });
      const rowJpg = row.jpeg();
      const rowBuffer = await rowJpg.toBuffer();
      slices.push(rowBuffer);
    }
    img = await joinImages(slices, {
      direction:'vertical'
    });
  }

  const imgJpeg = img.toFormat("jpeg");
  const imgBuffer = await imgJpeg.toBuffer();
  return imgBuffer;
}

export async function GET(
  req: NextRequest
) {
  if (req.method === "GET") {
    const username = req.nextUrl.searchParams.get("username");
    const movieCount = Number(req.nextUrl.searchParams.get("movieCount")) || 30;
    const timeSpanInDays =
      Number(req.nextUrl.searchParams.get("timeSpan")) || 30;
    const isMonthly:boolean = (req.nextUrl.searchParams.get("monthly") == "true");
    const feedUrl = `https://letterboxd.com/${username}/rss/`;
    try {
      const response = await fetch(feedUrl);
      if (!response.ok) {
        throw new Error(
          `Error fetching user letterboxd data: ${response.statusText}`
        );
      }
      const text = await response.text();
      const dom = new JSDOM(text, { contentType: "text/xml" });
      const document = dom.window.document;
      const items = document.querySelectorAll("item");
      const movies: Movie[] = [];

      const imagesUrl: string[] = [];

      items.forEach((item, index) => {
        if (index < movieCount) {

            const title = item
            .querySelector("title")!.textContent;

          const link = item.querySelector("link")!.textContent;
          const pubDate = new Date(
            Date.parse(item.querySelector("pubDate")!.textContent!)
          );

          const description = new JSDOM(
            item.querySelector("description")!.innerHTML
          );
          
          let posterUrl: string | null = "";

          // if(description.window.document.querySelector("img")!.src){
          //   const posterUrl =
          //     description.window.document.querySelector("img")!.src;
          // } else{
          //   posterUrl = null;
          // }
          
          try{
            posterUrl = description.window.document.querySelector("img")!.src
          }catch{
            posterUrl = "";
          }

          const id = index;
          
          if (
            (new Date().getTime() - pubDate.getTime()) /
            (1000 * 60 * 60 * 24) <=
            timeSpanInDays &&
            !movies.some((e) => e.title === title) ||
            !isMonthly
          ){
            imagesUrl.push(posterUrl);
            movies.push({ title, link, pubDate, id, posterUrl });
          }
        }
      });
      // console.log(movies)
      //JOINING IMAGES
      const imageBuffers = await Promise.all(imagesUrl.map(downloadImageAsBuffer))
      const validBuffers = imageBuffers.filter(buffer => buffer !== null)

      let dataURI: string = '';

      if(validBuffers.length != 0){
        const joinedImage = await joinImagesFromBuffer(validBuffers);
        const base64 = joinedImage.toString('base64');
        dataURI = `data:image/jpeg;base64,${base64}`;
        return Response.json({ movies: movies, dataURI: dataURI, username: username });
      }
      return Response.json({ movies: [], dataURI: '', username: username})
    } catch (error) {
      console.error(error);
      return Response.json({ movies: [], message: "Internal Error" });
    }
  }
}
