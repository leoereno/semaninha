export default function Footer(){
    return(
        <footer className="flex flex-col gap-1">
            <p className="text-gray-500 text-center mt-8 text-sm">Copyright © Leonardo Ereno {new Date().getFullYear()}</p>
            <div className="text-center text-sm flex flex-row gap-2 justify-center">
                <a href="https://github.com/leoereno" className="text-gray-500 hover:text-gray-300" target="_blank">Github</a>
                <a href="https://x.com/leoereno" className="text-gray-500 hover:text-gray-300" target="_blank">X/Twitter</a>
            </div>
        </footer>
    );
}