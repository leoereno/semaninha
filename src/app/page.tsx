'use client'
import { useState } from "react";
import { Movie } from "./api/latestMovies/route";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [movieCount, setMovieCount] = useState<string>('3');
  const [joinedImage, setJoinedImage] = useState<string>('');

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(`/api/latestMovies?username=${username}&movieCount=${movieCount}`);
    if(response){
      const data = await response.json();
      setMovies(data.movies);
      setJoinedImage(data.dataURI);
      console.log(data)
    }
    setLoading(false);
  }

  return (
    <>
    <label>
      Username
      <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username}/>
    </label>
    <label>
      Movie Count
      <input type="number" name="movieCount" id="" onChange={e => setMovieCount(e.target.value)} value={movieCount}/>
    </label>
      {!loading && <button onClick={handleClick}>Fetch</button>}
      <ul>
        {movies.map(e => <li key={e.id}>{e.title}
          
        </li>)}
      </ul>
      <div>
        <figure>
          {movies.map(e => <img src={e.posterUrl} width={100} key={e.id}/>)}
        </figure>
        {joinedImage != '' && <img src={joinedImage} alt="" width={500}/>}
      </div>
    </>
  );
}
