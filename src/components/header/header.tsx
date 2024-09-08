'use client'
import React from "react";
import {TextAnimation} from "@/components/text-animation/text-animation";
import {AnimatedPlanet} from "@/components/animated-planet/animated-planet";
import {useSession} from "next-auth/react";
import {useUserProfile} from "@/utils/user-profile-hook/useUserProfile";
import {HeaderItems} from "@/components/header/header-items";

export const Header: React.FC = () => {
    const {data: session} = useSession();
    const userData = useUserProfile(session);
    return (
        <div className='flex container flex-col mx-auto mt-10'>
            <div className='flex flex-row justify-center items-center'>
                <h1 className="text-white font-bold text-center ml-auto mr-12">
                    <TextAnimation text={`  Welcome to Your Dashboard, ${session?.user?.name}!`}/>
                </h1>
                <div className='flex justify-center items-center mr-5 gap-2'>
                    <HeaderItems/>
                    <img
                        src={userData?.avatar_url}
                        alt="Profile Image"
                        className="w-12 h-12 rounded-full border-4 border-gray-800 shadow-md"
                    />
                </div>

            </div>
            <div className='ml-10'>
                <AnimatedPlanet/>
            </div>
        </div>
    )
}