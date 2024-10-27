import React from "react";
import {TextAnimation} from "@/components/text-animation/text-animation";
import {AnimatedPlanet} from "@/components/animated-planet/animated-planet";
import {HeaderItems} from "@/components/header/header-items";
import {Avatar} from "@/components/avatar/avatar";
import Lottie from "lottie-react";
import animatedLogo from "../../../public/Animated-Github.json";
import {useLoadingStore} from "@/stores/loading/useLoadingStore";


export const Header: React.FC<HeaderProps> = ({userData}) => {
    const {initialLoad} = useLoadingStore();

    return (
        <div className='flex container flex-col mx-auto mt-10'>
            <div className='flex flex-row justify-center items-center'>
                <h1 className="text-white font-bold text-center ml-auto mr-12 hidden xl:block">
                    <TextAnimation text={`  Welcome to Your Dashboard, ${userData?.login}!`}/>
                </h1>
                <div className='flex justify-center items-center mr-5 gap-2'>
                    <HeaderItems/>
                    {initialLoad ?
                        <Lottie animationData={animatedLogo} className='w-12 h-12 animate-pulse max-sm:hidden'/>
                        :
                        <Avatar className={`w-12 h-12 max-sm:hidden`}
                                src={userData?.avatar_url} alt='Profile Image'/>
                    }
                </div>

            </div>
            <div className='ml-10'>
                <AnimatedPlanet/>
            </div>
        </div>
    )
}