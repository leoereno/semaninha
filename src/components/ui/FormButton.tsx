interface ButtonProps {
    children: React.ReactNode;
    bold: boolean;
}
export default function FormButton({children, bold} : ButtonProps){
    return(
        <button className="bg-primarygreen rounded-md p-4 text-white self-center w-full cursor-pointer mt-2">
            {bold ? <b>{children}</b> : children}
        </button>
    );
}