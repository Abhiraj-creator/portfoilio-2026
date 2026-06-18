import Link from "next/link"
import TextReveal from "./TextReveal"
import TextRoll from "./TextRoll"


const Navbar = () => {
    return (
        <div className="h-16 w-full  flex items-center justify-between px-6 py-2 uppercase font-jetbrains cursor-pointer  top-0 fixed left-0 z-[30]">
            <div className="left">
                <TextRoll>
                    <TextReveal splitBy="words" trigger="mount" stagger=".1">
                    <Link href="/" className="font-lg   font-black">Abhiraj singh bhati</Link>
                </TextReveal>
                </TextRoll>
            </div>
            <div className="right flex items-center gap-7 text-sm font-semibold ">
                <TextRoll>
                    <TextReveal delay=".2" stagger=".1">
                    <Link href="/" >home</Link>
                </TextReveal>
                </TextRoll>
               <TextRoll>
                 <TextReveal delay=".4" stagger=".1">
                    <Link href="/contact" >contact</Link>
                </TextReveal>
               </TextRoll>
               <TextRoll>
                <TextReveal delay=".6" stagger=".1">
                    <Link href="/project" >project</Link>
                </TextReveal>
               </TextRoll>
            </div>
        </div>
    )
}

export default Navbar