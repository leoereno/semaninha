import { UsernameContext } from "@/context/context";
import { useContext } from "react";

export default function Switch(){

    const userContext = useContext(UsernameContext);
    return(
        <div className="flex rounded-lg overflow-hidden border border-gray-600 bg-gray-900 w-full">
            <button className={`px-8 py-3 text-base font-medium transition-colors duration-200
                ${userContext?.formLast30Days
                    ? "bg-white text-black"
                    : "bg-darker text-white hover:bg-darkgray"
                } focus:outline-none cursor-pointer w-1/2`}
                onClick={() => userContext?.setFormLast30Days(true)}><b>30 days</b></button>
            <button className={`px-8 py-3 text-base font-medium transition-colors duration-200
                ${!userContext?.formLast30Days
                    ? "bg-white text-black"
                    : "bg-darker text-white hover:bg-darkgray"
                } focus:outline-none cursor-pointer w-1/2`}
                onClick={() => userContext?.setFormLast30Days(false)}><b>30 movies</b></button>
        </div>
    );
}