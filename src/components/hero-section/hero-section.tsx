'use client';
import Earth from "@/components/earth/earth";
import { AuthButton } from "@/components/auth-button/auth-button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Stars } from "@/components/stars/stars";
import Image from "next/image";
import { AnimatedLand } from "@/components/animated-land/animated-land";
import { Info } from "@/components/info/info";

export const HeroSection = () => {
    const [isFlying, setIsFlying] = useState(false);

    const handleGetStartedClick = () => {
        if (window.innerWidth >= 1024) {
            setIsFlying(true);
            setTimeout(() => {
                signIn('github', { callbackUrl: '/dashboard' });
            }, 7300);
        } else {
            signIn('github', { callbackUrl: '/dashboard' });
        }
    };

    return (
        <div className='relative flex flex-col items-center justify-center overflow-hidden h-screen
                        lg:flex-row'>
            <Stars />
            <AnimatedLand />

            <Image
                src='/images/hero-drone.webp'
                alt='hero-drone'
                width={500}
                height={326}
                className={`hidden lg:block absolute top-16 w-1/6 h-auto container left-20 xl:right-0 
                           transition-transform duration-1000 ${isFlying ? 'animate-fly' : 'hero-drone'}`}
            />

            <div className='w-screen mx-auto relative z-[2] mt-8'>
                <div className='flex my-8 relative text-center flex-col
                               sm:my-12 xl:my-16 xl:items-center'>
                    <div className='flex flex-col gap-7
                                  lg:items-start lg:gap-5'>

                        <h2 className='px-4 mb-4 text-3xl font-bold text-white text-center gradient cursor-default
                                     lg:text-left lg:text-5xl mx-auto
                                     xl:text-4xl xl:w-9/12'>
                            Github RepoSweep
                        </h2>

                        <p className="mb-4 px-4 text-[16px] text-[#7d8590] text-center
                                    lg:text-left
                                    mx-auto
                                    xl:text-xl xl:w-9/12">
                            Keep your GitHub workspace clean and organized with RepoSweep. Whether you're managing
                            multiple projects or learning to code, RepoSweep helps you streamline your repository list
                            by allowing easy bulk deletion of repositories. Start building from a clutter-free space
                            today.
                        </p>

                        <div className='text-center px-4
                                      lg:text-left lg:px-24'>
                            <AuthButton text='Get Started' onClick={handleGetStartedClick}/>
                        </div>

                        <div className='text-center px-4
                                      lg:text-left lg:px-28 lg:mt-1'>
                            <Info/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden lg:flex relative flex-col justify-center container'>
                <div className='relative z-[2]'>
                    <Earth/>
                </div>
                <div className='flex items-center justify-center relative z-[2] mt-[-200px]'>
                    <Image
                        src='/images/astrocat.png'
                        alt='github mascot'
                        width={801}
                        height={807}
                        className="pointer-events-none w-[400px] object-cover h-[403px]"
                    />
                </div>
            </div>
        </div>
    )
}