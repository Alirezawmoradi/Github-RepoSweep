import React from "react";
import Link from "next/link";
import {GithubIcon} from "@/components/icons/GithubIcon";
import {signOut} from "next-auth/react";
import {LogoutButton} from "@/components/auth-button/logout-button";
import {SlUserFollowing} from "react-icons/sl";

export const HeaderItems: React.FC<HeaderProps> = ({userData}) => {
    return (
        <div className="flex gap-5 justify-center text-xs xl:text-sm items-center text-gray-300">
            <Link href='https://github.com/Alirezawmoradi/Github-RepoSweep'>
                <div
                    className="flex gap-2 px-2 py-1 rounded-xl justify-center items-center hover:bg-gray-700 transition-colors duration-300">
                    <GithubIcon width={24} height={24}/>
                    Source Code
                </div>
            </Link>
            <Link href={`/follower-manager?username=${userData?.login}`}>
                <div
                    className="flex gap-2 px-2 py-1 rounded-xl justify-center items-center hover:bg-gray-700 transition-colors duration-300">
                    <SlUserFollowing width={24} height={24}/>
                    Follower Manager
                </div>
            </Link>
            <LogoutButton text={'Logout'} onClick={() => signOut()}/>
        </div>
    )
}