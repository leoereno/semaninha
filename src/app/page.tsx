"use client";
import { ReactNode, useState } from "react";
import Welcome from "@/components/ui/Welcome";
import CollageForm from "@/components/ui/CollageForm";
import CollageDisplay from "@/components/ui/CollageDisplay";
import Modal from "@/components/ui/Modal";
import { CollageContext, CollageContextProps, step } from "@/context/context";
import { ModalContext, UsernameContext, StepContext } from "@/context/context";
import Header from "@/components/ui/Header";

interface ModalContent {
  display: boolean;
  content: ReactNode;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [formLast30Days, setFormLast30Days] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<step>("home");
  const [base64Image, setBase64Image] = useState<string>("");

  return (
    <>
        <ModalContext.Provider value={{showModal, setShowModal}}>
          <Header />
        </ModalContext.Provider>
        <UsernameContext.Provider value={{username, setUsername, formLast30Days, setFormLast30Days}}>
          <StepContext.Provider value={{step, setStep}}>
            {step === "home" && <Welcome />}
            <CollageContext.Provider value={{base64Image, setBase64Image}}>
              {step === "form" && <CollageForm /> }
              {step === "collage" && <CollageDisplay />}
            </CollageContext.Provider>
          </StepContext.Provider>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="About Us">
            
            <div className="text-md flex flex-col gap-2">
              <p>BoxdCap is developed and maintened by <strong>Camisapolo TECH</strong></p>
              <p>Arthur Esmitiz - Interface design & UX</p>
              <p>Leonardo Ereno - Programming</p>
            </div>
          </Modal>
        </UsernameContext.Provider>
    </>
  );
}
