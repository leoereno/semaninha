"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [joinedImage, setJoinedImage] = useState<string>("");
  const [resultUsername, setResultUsername] = useState<string>("");
  const [monthly, setMonthly] = useState<boolean>(true);
  const [lastFour, setLastFour] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    console.log(`/api/latestMovies?username=${username}&monthly=${monthly}`);
    const response = await fetch(
      `/api/latestMovies?username=${username}&monthly=${monthly}&movieCount=${lastFour ? '4' : ''}`
    );
    if (response) {
      const data = await response.json();
      if (data.message != undefined) {
        alert("Error fetching user data! Please check username and try again.");
      } else if (data.movies.length < 1) {
        alert(`${data.username} has no movies logged for the time period!`);
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
  };


  return (
    <div className="flex flex-col min-h-screen justify-between p-4 gap-1 max-h-svh overflow-hidden">
      <h1 className="text-3xl text-white text-center font-thin">BoxdCap</h1>
      {!joinedImage && !loading && (
        <div
          className={`flex flex-col items-center m-12 transition duration-300 ease-in-out backdrop-blur-lg`}
        >
          <input
            placeholder="Letterboxd username..."
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="focus:outline-0 border-b-1 text-center text-white text-xl p-2 pt-4"
          />
          <div className="text-white flex content-center justify-center flex-col">
            <div className="flex">
              <input
                type="checkbox"
                name="Monthly?"
                id=""
                checked={monthly}
                onChange={() => {setMonthly(!monthly); setLastFour(false)}}
                value={"Monthly?"}
                className="mt-4 mb-4 mr-2 ml-2 p-2 text-white transition duration-100 rounded-md checked:border-0"
              />
              <p className="content-center text-sm font-thin">Last 30 days</p>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                name="Last 4 watched?"
                id=""
                checked={lastFour}
                onChange={() => {setLastFour(!lastFour); setMonthly(false)}}
                value={"Monthly?"}
                className="mt-4 mb-4 mr-2 ml-2 p-2 text-white transition duration-100 rounded-md checked:border-0"
              />
              <p className="content-center text-sm font-thin">Last 4 watched</p>
            </div>
          </div>
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
          <div className="flex flex-col items-center justify-center mt-6 shrink max-h-1/6">
            <p className="text-white">
              {monthly ? `Last month ` : `#LastFourWatched ` }for<b> {resultUsername}</b>
            </p>
            <Image
              src={joinedImage}
              alt="Movie tiles recap"
              width={350}
              height={400}
              className="p-4 shadow-2xl shrink 2xl:w-2xl"
            />
            <a
              download={"month.jpg"}
              href={joinedImage}
              className="text-gray-300 text-sm mb-5 hover:text-gray-100 transition duration-100"
              title="Download"
            >
              Download
            </a>
            <button
              onClick={handleReset}
              className="text-white border-2 rounded-2xl pr-6 pl-6 cursor-pointer hover:text-black hover:bg-white transition duration-150 hover:border-white"
            >
              Back
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
