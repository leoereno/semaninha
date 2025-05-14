import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

export default function Modal (props: ModalProps) {
    if(!props.isOpen) 
        return null;
    else
        return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-darker/70">
            <div className="font-nunito relative text-white bg-darkgray rounded-2xl shadow-lg max-w-lg w-full p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">{props.title}</h3>
                {props.children}
                <button onClick={props.onClose} className="p-4 text-xl font-bold font-nunito cursor-pointer hover:text-gray">
                    Close
                </button>

            </div>
        </div>); 
}