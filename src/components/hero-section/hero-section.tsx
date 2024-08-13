'use client';
import Earth from "@/components/earth/earth";
import {AuthButton} from "@/components/auth-button/auth-button";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {Stars} from "@/components/stars/stars";
import Image from "next/image";

export const HeroSection = () => {
    const [isFlying, setIsFlying] = useState(false);
    const handleGetStartedClick = () => {
        setIsFlying(true);
        setTimeout(() => {
            signIn('github', {callbackUrl: '/dashboard'});
        }, 7300);
    };
    return (
        <div className='relative flex flex-col lg:flex-row items-center justify-center overflow-hidden'>
            <Image src='/images/footer-galaxy.webp' alt='hero-section' width={801} height={807}
                   className='fixed bottom-0 left-0 w-full h-full object-cover d-block pointer-events-none'/>
            <Stars/>
            <Image src='/images/hero-drone.webp' alt='hero-drone' width={500} height={326}
                   className={`max-sm:hidden absolute top-16 w-1/6 h-auto container left-20 xl:right-0 transition-transform duration-1000 ${isFlying ? 'animate-fly' : 'hero-drone'}`}/>
            <div className='w-screen mx-auto relative z-[2]'>
                <div className='flex my-8 md:my-16 sm:my-12 relative md:items-center text-center flex-col'>
                    <div className='flex flex-col lg:items-start max-sm:gap-7'>
                        <h2 className='px-4 mb-4 md:w-9/12 mx-auto lg:text-5xl md:text-4xl text-3xl font-bold text-white text-left'>
                            Github RepoSweep
                        </h2>
                        <p className="mb-4 md:text-xl text-[16px] text-[#7d8590] px-4 mx-auto md:w-9/12 text-left max-sm:text-center">
                            Keep your GitHub workspace clean and organized with RepoSweep. Whether you’re managing
                            multiple projects or learning to code, RepoSweep helps you streamline your repository list
                            by allowing easy bulk deletion of repositories. Start building from a clutter-free space
                            today.
                        </p>
                        <div className='lg:text-left lg:px-24'>
                            <AuthButton text='Get Started' onClick={handleGetStartedClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative flex-col justify-center container'>
                <div className={`relative z-[2] max-sm:hidden`}>
                    <Earth/>
                </div>
                <div className='flex items-center justify-center relative z-[2] mt-[-200px]'>
                    <Image src='/images/astrocat.png' alt='github' width={801} height={807}
                           className="max-sm:hidden pointer-events-none  w-[400px] object-cover h-[403px]"/>
                </div>
            </div>
        </div>
    )
}