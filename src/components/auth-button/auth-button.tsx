'use client';

import {useState} from "react";
import Lottie from "lottie-react";
import animatedLogo from '../../../public/Animation - 1725117489910.json'

export const AuthButton = ({text, onClick}: AuthButtonProps) => {
    const [hovered, setHovered] = useState<boolean>(false)
    return (
        <div
            className='lg:ml-5 flex items-center justify-center lg:space-x-5 max-lg:space-y-3 max-lg:flex-col max-lg:w-full max-lg:mt-5'>
            <button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
               onClick={onClick}
               className='flex items-center bg-white cursor-pointer hover:bg-gray-300 transition-colors duration-300 font-bold px-14 py-3 justify-center rounded-md text-[20px]'>
                {text}
                <Lottie animationData={animatedLogo}  className={`w-8 ml-3 transition ease-in duration-150 ${hovered ? "translate-x-2 " : "-translate-x-0"}`}/>
            </button>
        </div>
    )
}