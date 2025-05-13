interface ModalProps {
    children: React.ReactNode;
}
export default function Modal({children}: ModalProps){
    return(
        <div className="bg-darker text-white text-left flex flex-col gap-6 items-start rounded-xl self-center font-nunito p-12 pr-8 pl-8">
            {children}
        </div>
    )
}