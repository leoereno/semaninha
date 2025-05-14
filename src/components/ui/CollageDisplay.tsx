import { useContext } from "react";
import ContentBoard from "./ContentBoard";
import { UsernameContext } from "@/app/page";
import FormButton from "./FormButton";
import testResult from '../../../public/test-result.jpg';
import Image from "next/image";



export default function CollageDisplay(){
    const userContext = useContext(UsernameContext);
    return(
        <ContentBoard>
            <h2 className="text-3xl">Last month for <b>{userContext?.username}</b></h2>
            <Image src={testResult} alt={`Result for ${userContext?.username}`} width={500} height={500} className="max-w-lg max-h-lg"/>
            <FormButton bold={true}>Download</FormButton>
            <a href="#" className="self-center">Generate Again</a>
        </ContentBoard>
    );
}