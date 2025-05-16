import { useContext } from "react";
import ContentBoard from "./ContentBoard";
import FormButton from "./FormButton";
import Image from "next/image";
import { CollageContext, StepContext, UsernameContext } from "@/context/context";



export default function CollageDisplay(){
    const userContext = useContext(UsernameContext);
    const collageContext = useContext(CollageContext);
    const stepContext = useContext(StepContext);
    return(
        <ContentBoard>
            <h2 className="text-xl">Last movies for <b>{userContext?.username}</b></h2>
            <Image src={collageContext!.base64Image} alt={`Result for ${userContext?.username}`} width={200} height={200} className="object-scale-down shrink"/>
            <FormButton bold={true}><a href={collageContext?.base64Image} download="collage">Download</a></FormButton>
            <button onClick={() => {stepContext?.setStep("form"); userContext?.setUsername("")}} className="self-center cursor-pointer hover:text-gray">Generate Again</button>
        </ContentBoard>
    );
}