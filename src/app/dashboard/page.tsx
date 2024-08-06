'use client';
import {useSession} from "next-auth/react";
import axios from "axios";
import {useState} from "react";

interface Repos {
    name: string;
    id: number;
    private: boolean
}

export default function Dashboard() {
    const {data: session} = useSession();
    const [repos, setRepos] = useState<Repos[]>([]);
    const handleClick = async () => {
        if (!session) {
            console.log("No session found");
            return;
        }

        console.log("Access Token:", session.accessToken);

        try {
            const result = await axios.get('https://api.github.com/user/repos', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            console.log('Data:', result.data);
            setRepos(result.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <>
            {session?.user?.name}
            {session?.user?.email}
            <img src={`${session?.user?.image}`} alt='image' width={256} height={256}/>
            <button onClick={handleClick}>Log data</button>
            <div>
                <h2>Your Repositories:</h2>
                <ul>
                    {repos.map((repo) => (
                        <li key={repo.id} className='flex gap-2'>
                            <p> {repo.name}</p>
                            <p> {repo.private ? 'private' : 'public'}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}