"use client";
import { useState } from "react";
import { Movie } from "./api/latestMovies/route";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [joinedImage, setJoinedImage] = useState<string>("");
  const [error, setError] = useState(false);
  const [resultUsername, setResultUsername] = useState<string>("");

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(`/api/latestMovies?username=${username}`);
    if (response) {
      const data = await response.json();
      if (data.message != undefined) {
        setError(true);
        alert("Error fetching user data! Please check username and try again.");
        setError(false);
      } else {
        setResultUsername(data.username);
        setMovies(data.movies);
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
      <h1 className="text-3xl text-white text-center m-6">KinoCap</h1>
      {!joinedImage && !loading && (
        <div className="flex flex-col items-center m-12 transition duration-300 ease-in-out">
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
              className="cursor-pointer m-4 text-white border-2 rounded-2xl pr-6 pl-6 pt-0.5 pb-0.5"
            >
              Generate
            </button>
          )}
        </div>
      )}
      <div>
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        {joinedImage != "" && !loading && (
          <div className="flex flex-col items-center justify-center mt-6">
            <p className="text-white">
              Last month for <b>{resultUsername}</b>
            </p>
            <img src={joinedImage} alt="" width={400} className="p-4 shadow-2xl" />
            <a download={"month.jpg"} href={joinedImage} className="text-gray-300 text-sm mb-5" title="Download">Download</a>
            <button onClick={handleReset} className="text-white border-2 rounded-2xl pr-6 pl-6">Back</button>
          </div>
        )}
      </div>
    </>
  );
}
