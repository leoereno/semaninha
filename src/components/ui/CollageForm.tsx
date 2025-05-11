import { useState } from "react";
import Switch from "./Switch";

export default function CollageForm(){

    const [checked, setChecked] = useState<boolean>(false);

    return(
        <div className="bg-darker text-white text-left flex flex-col gap-4 items-start rounded-xl self-center font-nunito p-12 pr-8 pl-8">
            <h2 className="text-3xl mb-2"><b>Collage Generator</b></h2>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-sm">Enter your Letterboxd username</label>
                <input type="text" name="" id="" placeholder="Type here" className="text-2xl border-2 rounded-lg p-2"/>
                <label className="text-sm">Select range</label>
                <div>
                    <Switch onChange={setChecked} checked={checked}/>
                    <span>{checked ? 'On' : 'Off'}</span>
                </div>
            </div>
        </div>
    );
}