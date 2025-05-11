export default function Welcome(){
    return(
        <div className="text-white flex flex-col gap-8 items-center self-center font-nunito">
            <p className="text-5xl">Welcome to <b>BoxdCap</b></p>
            <p className="text-xl">Create a collage from your last <strong>Letterboxd logs!</strong></p>
            <a href="#" className="p-4 pr-8 pl-8 text-white bg-primarygreen rounded-xl text-xl"><strong>Create Collage</strong></a>
        </div>
    );
}