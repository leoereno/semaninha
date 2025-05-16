'use client'
import { use, useContext, useState } from "react";
import Switch from "./Switch";
import ContentBoard from "./ContentBoard";
import { CollageContext, StepContext, UsernameContext } from "@/context/context";


export default function CollageForm(){
    const userContext = useContext(UsernameContext);
    const stepContext = useContext(StepContext);
    const [loading, setLoading] = useState<boolean>(false);
    const collageContext = useContext(CollageContext);

    const handleSubmit = async () => {
        setLoading(true);
        if(userContext!.username.length < 2){
            alert('Please insert a valid username and try again');
            userContext?.setUsername('');
            setLoading(false);
            return;
        }

        const response = await fetch(
            `/api/latestMovies?username=${userContext?.username}&monthly=${userContext?.formLast30Days}&movieCount=30`
        );
        if(response && response.ok){
            const data = await response.json();
            if(data.message != undefined || data.movies.length < 1)
                alert(`Error fetching user ${userContext?.username} movies`);
            else{
                collageContext?.setBase64Image(data.dataURI);
                stepContext?.setStep("collage");
            }
        }

    }

    return(
        <ContentBoard>
            <h2 className="text-2xl mb-2"><b>Collage Generator</b></h2>
            <div className="flex flex-col gap-4 shrink">
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
            <button className="bg-primarygreen rounded-md p-4 text-white self-center w-full cursor-pointer mt-2" onClick={() => handleSubmit()}><b>Generate</b></button>
            <button onClick={() => stepContext?.setStep("home")} className="text-center self-center cursor-pointer">Back</button>
        </ContentBoard>
    );
}