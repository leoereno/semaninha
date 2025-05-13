export default function Footer(){
    return(
        <footer className="flex flex-row justify-between bg-middark p-2 pr-16 pl-16 font-nunito">
            <div className="text-center text-sm flex flex-row gap-2 justify-center">
                <a href="https://github.com/leoereno" className="text-white hover:text-gray-300" target="_blank">Github</a>
                <a href="https://x.com/leoereno" className="text-white hover:text-gray-300" target="_blank">X/Twitter</a>
            </div>
            <p className="text-white text-center text-sm">Copyright <span className="text-gray">©</span> CamisapoloTECH {new Date().getFullYear()}</p>
        </footer>
    );
}