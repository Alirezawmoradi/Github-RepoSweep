import Link from "next/link";
import {NewRocketIcon} from "@/components/icons/NewRocketIcon";
import {GithubIcon} from "@/components/icons/GithubIcon";

export const Info = () => {
    const Routes = [
        {
            name: 'Source Code',
            href: 'https://github.com/Alirezawmoradi/Github-RepoSweep',
            icon: <GithubIcon width={24} height={24}/>,
        }, {
            name: 'About RepoSweep',
            href: '/about',
            icon: <NewRocketIcon width={24} height={24} className='rotate-45'/>
        },
    ]
    return (
        <div>
            <ul className="flex gap-5 justify-center text-xs xl:text-sm items-center text-gray-300">
                {
                    Routes.map((route) => {
                        return <li key={route.href} className='flex gap-2 justify-center items-center'>
                            <Link href={route.href}>
                                <div
                                    className="flex gap-2 px-2 py-1 rounded-xl justify-center items-center hover:bg-gray-700 transition-colors duration-300">
                                    {route.icon}
                                    {route.name}
                                </div>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
