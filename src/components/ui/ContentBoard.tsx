interface ModalProps {
    children: React.ReactNode;
}
export default function ContentBoard({children}: ModalProps){
    return(
        <div className="bg-darker text-white text-left flex flex-col gap-3 items-start rounded-xl self-center font-nunito p-10 pr-8 pl-8 shrink overflow-y-auto min-h-0">
            {children}
        </div>
    )
}