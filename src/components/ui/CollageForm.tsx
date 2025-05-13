import { useContext, useState } from "react";
import Switch from "./Switch";
import { UsernameContext } from "@/app/page";
import Modal from "./Modal";

export default function CollageForm(){
    const userContext = useContext(UsernameContext);
    return(
        <Modal>
            <h2 className="text-3xl mb-2"><b>Collage Generator</b></h2>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-sm"><b>Enter your Letterboxd username</b></label>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder="Type here" 
                    className="text-2xl border-2 rounded-lg p-2 focus:outline-none"
                    onChange={(e) => userContext!.setUsername(e.target.value)}
                    />
                <label className="text-sm"><b>Select range</b></label>
                <div>
                    <Switch />      
                </div>
            </div>
            <button className="bg-primarygreen rounded-md p-4 text-white self-center w-full cursor-pointer mt-2"><b>Generate</b></button>
        </Modal>
    );
}