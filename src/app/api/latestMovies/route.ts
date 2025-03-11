import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from 'jsdom';

type Movie = {
    title: string | null;
    link: string | null;
    pubDate: Date | null;
}

type ResponseData = {
    movies?: Movie[];
    message?: string;
}

export async function GET(
    req: NextRequest,
    res: NextResponse<ResponseData>,
    username: string
){
    if(req.method === "GET"){
        //const username = req.url?.split('?')[1].split('=')[1];
        const username = req.nextUrl.searchParams.get("username");
        const feedUrl = `https://letterboxd.com/${username}/rss/`;
        try {
          const response = await fetch(feedUrl);
          if (!response.ok) {
            throw new Error(`Error fetching RSS feed: ${response.statusText}`);
          }
          const text = await response.text();
          const dom = new JSDOM(text, { contentType: "text/xml" });
          const document = dom.window.document;
          //const xml = parser.parseFromString(text, "application/xml");
          const items = document.querySelectorAll("item");
          //console.log(items);
          const movies: Movie[] = [];
          items.forEach((item, index) => {
            if (index < 4) {
              const title = item.querySelector("title")!.textContent;
              const link = item.querySelector("link")!.textContent;
              const pubDate = new Date(Date.parse(item.querySelector("pubDate")!.textContent!));
    
              movies.push({ title, link, pubDate });
            }
          });
          console.log(movies)
          return Response.json({movies: movies.slice(0,5)})
          //res.status(200).json({movies: movies.slice(0,5)})
          //return movies;
        } catch (error) {
          console.error(error);
          return Response.json({message: "Internal Error"})
          //res.status(500).json({message: "Internal error"})
        }
    }
}