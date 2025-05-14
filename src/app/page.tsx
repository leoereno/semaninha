"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Welcome from "@/components/ui/Welcome";
import CollageForm from "@/components/ui/CollageForm";
import CollageDisplay from "@/components/ui/CollageDisplay";
import Modal from "@/components/ui/Modal";

interface UsernameContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  formLast30Days: boolean;
  setFormLast30Days: Dispatch<SetStateAction<boolean>>;
}

export const UsernameContext = createContext<UsernameContextProps | null>(null);
export const MoviesLast30Days = createContext<boolean>(false);

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [joinedImage, setJoinedImage] = useState<string>("");
  const [resultUsername, setResultUsername] = useState<string>("");
  const [monthly, setMonthly] = useState<boolean>(true);
  const [lastFour, setLastFour] = useState<boolean>(false);
  const [formLast30Days, setFormLast30Days] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(true);

  

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
    <div className="flex flex-col min-h-screen justify-between gap-1 bg-darkgray bg-main max-h-svh overflow-hidden">
        <Header />
        <UsernameContext.Provider value={{username, setUsername, formLast30Days, setFormLast30Days}}>
          {/* <CollageForm /> */}
          <CollageDisplay />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h3 className="text-lg font-bold">About Us</h3>
            <div className="text-md flex flex-col gap-2">
              <p>BoxdCap is developed and maintened by Camisapolo TECH</p>
              <p>Camisapolo TECH is: </p>
              <p>Arthur Esmitiz - Interface design & UX</p>
              <p>Leonardo Ereno - Programming</p>
            </div>
          </Modal>
        </UsernameContext.Provider>
        {/* <Welcome /> */}

        <Footer />
    </div>
  );
}
