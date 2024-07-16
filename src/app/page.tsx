'use client';
import {AuthButton} from "@/components/auth-button/auth-button";
import {useSession} from "next-auth/react";
import axios from "axios";

export default function Home() {
    const {data: session} = useSession();
    const handleClick = async () => {
        try {
            const result = await axios(`https://api.github.com/users/username`)
            console.log(result);
        }catch (error){
            console.log(error);
        }
    }
    return (
        <>
            <div className='flex w-full justify-center items-center'>This is Main Page</div>
            <AuthButton/>
            {session?.user?.name}
            {session?.user?.email}
            <img src={`${session?.user?.image}`} alt='image' width={256} height={256}/>
            <button onClick={handleClick}>Log data</button>
        </>
    );
}
