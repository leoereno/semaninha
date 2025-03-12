import { NextRequest, NextResponse } from "next/server";
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

type ResponseData = {
  movies?: Movie[];
  message?: string;
  dataUri?: string;
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

async function joinImagesFromBuffer(validBuffers: Buffer<any>[]) {

  const crop = async (e: Buffer<any>) => {
    const square = await sharp(e).resize(300, 300, {
      fit: 'contain',
      background: {r:255,g:255,b:255}
    })
    .jpeg({quality: 90})
    .toBuffer()
    return square;
  }

  const squareBuffers = await Promise.all(validBuffers.map(crop))

  const img = await joinImages(validBuffers, {
    direction: 'horizontal'
  });
  const imgJpeg = img.toFormat("jpeg");
  const imgBuffer = await imgJpeg.toBuffer();
  return imgBuffer;
}

export async function GET(
  req: NextRequest,
  res: NextResponse<ResponseData>,
  username: string
) {
  if (req.method === "GET") {
    const username = req.nextUrl.searchParams.get("username");
    const movieCount = Number(req.nextUrl.searchParams.get("movieCount")) || 10;
    const timeSpanInDays =
      Number(req.nextUrl.searchParams.get("timeSpan")) || 30;
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
            .querySelector("title")!
            .textContent?.split("-")
            .slice(0, -1)
            .join(" ");

          const link = item.querySelector("link")!.textContent;
          const pubDate = new Date(
            Date.parse(item.querySelector("pubDate")!.textContent!)
          );

          const description = new JSDOM(
            item.querySelector("description")!.innerHTML
          );
          const posterUrl =
            description.window.document.querySelector("img")!.src;

          const id = index;
          if (
            (new Date().getTime() - pubDate.getTime()) /
            (1000 * 60 * 60 * 24) <=
            timeSpanInDays &&
            !movies.some((e) => e.title === title)
          ){
            imagesUrl.push(posterUrl);
            movies.push({ title, link, pubDate, id, posterUrl });
          }
        }
      });
      //console.log(movies)
      //JOINING IMAGES
      const imageBuffers = await Promise.all(imagesUrl.map(downloadImageAsBuffer))
      const validBuffers = imageBuffers.filter(buffer => buffer !== null)
      const joinedImage = await joinImagesFromBuffer(validBuffers);
      const base64 = joinedImage.toString('base64');
      const dataURI = `data:image/jpeg;base64,${base64}`;

      return Response.json({ movies: movies, dataURI: dataURI });
    } catch (error) {
      console.error(error);
      return Response.json({ movies: [], message: "Internal Error" });
    }
  }
}
