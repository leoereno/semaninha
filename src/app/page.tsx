"use client";
import { useState } from "react";
import Image from "next/image";
import coverBg from '../../public/cover.jpg';
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [joinedImage, setJoinedImage] = useState<string>("");
  const [resultUsername, setResultUsername] = useState<string>("");

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(`/api/latestMovies?username=${username}`);
    if (response) {
      const data = await response.json();
      if (data.message != undefined || data.movies.length < 1) {
        alert("Error fetching user data! Please check username and try again.");
      } else {
        setResultUsername(data.username);
        setJoinedImage(data.dataURI);
      }
    }
    setLoading(false);
  };

  const handleReset = () => {
    setJoinedImage("");
    setResultUsername("");
    setUsername("");
  }

  return (
    <>
      <h1 className="text-3xl text-white text-center m-6 font-thin">BoxdCap</h1>
      {!joinedImage && !loading && (
        <div className={`flex flex-col items-center m-12 transition duration-300 ease-in-out backdrop-blur-lg`}> 
          <input
            placeholder="Letterboxd username..."
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="focus:outline-0 border-b-1 text-center text-white text-xl p-2 pt-4"
          />
          {!loading && (
            <button
              onClick={handleClick}
              className="cursor-pointer m-4 text-white border-2 rounded-2xl pr-6 pl-6 pt-0.5 pb-0.5 hover:bg-white hover:text-black hover:border-2 hover:border-white transition duration-150"
            >
              Generate
            </button>
          )}
        </div>
      )}
      <div>
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        {joinedImage != "" && !loading && (
          <div className="flex flex-col items-center justify-center mt-6 shrink">
            <p className="text-white">
              Last month for <b>{resultUsername}</b>
            </p>
            <Image src={joinedImage} alt="Movie tiles recap" width={400} height={500} className="p-4 shadow-2xl" />
            <a download={"month.jpg"} href={joinedImage} className="text-gray-300 text-sm mb-5" title="Download">Download</a>
            <button onClick={handleReset} className="text-white border-2 rounded-2xl pr-6 pl-6 cursor-pointer hover:text-black hover:bg-white transition duration-150">Back</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
