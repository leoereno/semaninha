'use client'
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { ModalContext } from "@/app/page";
import { useContext } from "react";

export default function Header() {

    const modalContext = useContext(ModalContext);

    return(
    <header className="bg-middark font-nunito">
        <div className="p-4 pr-16 pl-16 flex flex-row justify-between text-white">
            <div className="flex flex-row gap-4">
                <Image src={logo} alt="logo" width={100} height={100}/>
                <a className="text-2xl" href="#">
                    <b>BoxdCap</b>
                </a>
            </div>
            <div className="flex justify-between gap-12">
                <a href="#">Home</a>
                <a href="#" onClick={() => modalContext?.setShowModal(true)}>What's new</a>
                <a href="#" onClick={() => modalContext?.setShowModal(true)}>About us</a>
            </div>
        </div>
    </header>)
}