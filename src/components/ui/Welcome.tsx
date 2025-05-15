
import { StepContext } from "@/context/context";
import { useContext } from "react";

export default function Welcome(){
    const stepContext = useContext(StepContext);
    return(
        <div className="text-white flex flex-col gap-8 items-center self-center font-nunito">
            <p className="text-5xl">Welcome to <b>BoxdCap</b></p>
            <p className="text-xl">Create a collage from your last <strong>Letterboxd logs!</strong></p>
            <button
                className="p-4 pr-8 pl-8 text-white bg-primarygreen rounded-xl text-xl cursor-pointer hover:bg-primarygreen/90 transition-colors duration-150" 
                onClick={() => stepContext?.setStep("form")}>
                    <strong>Create Collage</strong>
            </button>
        </div>
    );
}