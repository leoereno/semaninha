import { useContext } from "react";
import Modal from "./Modal";
import { UsernameContext } from "@/app/page";
import FormButton from "./FormButton";



export default function CollageDisplay(){
    const userContext = useContext(UsernameContext);
    return(
        <Modal>
            <h2 className="text-3xl">Last month for <b>{userContext?.username}</b></h2>
            <FormButton bold={true}>Download</FormButton>
            <a href="#" className="self-center">Generate Again</a>
        </Modal>
    );
}