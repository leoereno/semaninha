"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Welcome from "@/components/ui/Welcome";
import CollageForm from "@/components/ui/CollageForm";
import CollageDisplay from "@/components/ui/CollageDisplay";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

interface UsernameContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  formLast30Days: boolean;
  setFormLast30Days: Dispatch<SetStateAction<boolean>>;
}

interface ModalContextProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalContent {
  display: boolean;
  content: ReactNode;
}

type step = "home" | "form" | "collage";

interface SetpContextProps {
  step: step;
  setStep: Dispatch<SetStateAction<step>>;
}

export const UsernameContext = createContext<UsernameContextProps | null>(null);
export const MoviesLast30Days = createContext<boolean>(false);
export const ModalContext = createContext<ModalContextProps | null>(null);
export const StepContext = createContext<SetpContextProps | null>(null);


export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [joinedImage, setJoinedImage] = useState<string>("");
  const [resultUsername, setResultUsername] = useState<string>("");
  const [monthly, setMonthly] = useState<boolean>(true);
  const [lastFour, setLastFour] = useState<boolean>(false);
  const [formLast30Days, setFormLast30Days] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<step>("home");

  

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
    <>
        <ModalContext.Provider value={{showModal, setShowModal}}>
          {/* <Header /> */}
        </ModalContext.Provider>
        <UsernameContext.Provider value={{username, setUsername, formLast30Days, setFormLast30Days}}>
          <StepContext.Provider value={{step, setStep}}>
            <Welcome />
            {/* {step === "home" && <Welcome />} */}
            {/* {step === "form" && <CollageForm />}
            {step === "collage" && <CollageDisplay />} */}
          </StepContext.Provider>
          {/* <CollageForm /> */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="About Us">
            
            <div className="text-md flex flex-col gap-2">
              <p>BoxdCap is developed and maintened by <strong>Camisapolo TECH</strong></p>
              <p>Arthur Esmitiz - Interface design & UX</p>
              <p>Leonardo Ereno - Programming</p>
            </div>
          </Modal>
        </UsernameContext.Provider>
        {/* <Welcome /> */}

        {/* <Footer /> */}
    </>
  );
}
