import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";
import Image from "next/image";

export default async function About() {
    return (
        <div className="relative min-h-screen text-white flex flex-col items-center justify-center bg-hero bg-center bg-cover bg-no-repeat px-5 overflow-hidden">
            <div className="absolute top-10 right-10 animate-space-drift hidden md:block">
                <Image src='/images/octonaut.png' alt='about' width={250} height={250}/>
            </div>
            <div className='flex flex-col items-start justify-start max-w-2xl text-base mb-10 mt-8'>

                <div className=" mt-10  ">
                    <h1 className="text-4xl font-bold gradient ">RepoSweep</h1>
                    <h2 className="text-2xl font-bold mt-10">About</h2>
                </div>

                <p className="text-left border border-gray-500 bg-gray-800/50 p-6 rounded-xl mt-8 shadow-lg leading-relaxed">
                    RepoSweep helps you keep your GitHub workspace clean and organized.
                    Whether you&apos;re managing multiple projects or learning to code, RepoSweep
                    streamlines your repository list by allowing easy bulk deletion of repositories.
                    Start building from a clutter-free space today.
                </p>

                <h2 className="text-2xl font-bold mt-10 text-center">Features</h2>
                <ul className="list-disc list-inside space-y-4 text-left border border-gray-500 bg-gray-800/50 p-6 rounded-xl mt-8 shadow-lg">
                    <li>Bulk delete repositories to manage your GitHub workspace efficiently.</li>
                    <li>Seamless integration with GitHub for quick and easy setup.</li>
                    <li>Secure login with GitHub authentication.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-10 text-center">Contribute</h2>
                <div className="flex flex-col items-center border border-gray-500 bg-gray-800/50 p-6 rounded-xl shadow-lg mt-8">
                    <p className="text-center mb-4">
                        RepoSweep is an open-source project. Feel free to contribute on our GitHub repository.
                    </p>
                    <Link href='https://github.com/Alirezawmoradi/Github-NextAuth'>
                        <div className="flex gap-2 px-4 py-2 rounded-lg items-center bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-md">
                            <GithubIcon width={24} height={24} />
                            <span>Source Code</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
