"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Welcome from "@/components/ui/Welcome";
import CollageForm from "@/components/ui/CollageForm";

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
    <div className="flex flex-col min-h-screen justify-between gap-1 bg-darkgray bg-main max-h-svh overflow-hidden bg-blend-multiply">
        <Header />
        {/* <Welcome /> */}
        <CollageForm />

        <Footer />
    </div>
  );
}
