'use client'
import React, {useState} from 'react'
import {motion} from "framer-motion"
import HoverCard from "@/components/card/hover-card";
import {Badge} from "@/components/badge";
import {RepoStars} from "@/components/repo-stars/repo-stars";


export const Card = ({
                         name,
                         description,
                         isPrivate,
                         url,
                         onSelect,
                         isSelected,
                         language,
                         stargazers_count,
                         topics
                     }: CardProps) => {
    const [hovered, setHovered] = useState<boolean>(false)
    const [showLang, setShowLang] = useState<boolean>(true)

    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: .1,
            },
        },
    };

    const item = {
        hidden: {opacity: 0},
        show: {opacity: 1, transition: {type: 'tween'}},
    };

    return (
        <HoverCard backgroundColor='#7ee787' direction='' left='0'>
            <div className='relative flex items-center justify-center gap-5 w-screen overflow-hidden'>
                <div className='overflow-hidden rounded-s-lg z-[1] flex pl-5 shadow-3xl'>
                    <div
                        className='text-left border-[0.5px] bg-[#161b22] border-[#30363d] rounded-lg text-[#161b22] box-shadow-card md:mt-10 md:ml-0 sm:ml-10 sm:mr-10 mb-16 ml-3 mr-3 '>
                        <div className='w-96'>
                            <div className='overflow-x-auto pt-2 px-2 mb-0 border-b-[0.5px] border-[#30363d] '>
                                <div className='flex items-center bg-[#161b22] text-[#7d8590] tab-nav'>
                                    <button onClick={() => {
                                        setShowLang(true)
                                    }} type="button"
                                            className={`flex items-center py-2 px-4 ${showLang ? "border-[0.5px] rounded-t-md border-b-[0] text-white border-[#30363d] bg-[#0d1117]" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" role="img" fill='currentColor'
                                             viewBox="0 0 24 24" aria-hidden="true" className="octicon mr-2" height="16"
                                             width="16"><title>JavaScript</title>
                                            <path
                                                d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"></path>
                                        </svg>
                                        <span>{name}.{language === 'JavaScript' ? 'js' : language === 'TypeScript' ? 'ts' : language === 'Python' ? 'py' : language}</span>
                                    </button>
                                </div>
                            </div>
                            <div className={`p-4 relative bg-[#0d1117] ${showLang ? "" : "hidden"}`}>
                                <div className='flex w-full'>
                                    <div className='text-[#6e7681] text-right'>
                                        {Array.from({length: 7}, (_, index) => (
                                            <div className="pr-2" key={index + 1}>{index + 1}</div>
                                        ))}
                                    </div>
                                    <div className='flex flex-col overflow-hidden text-white rounded-b-md w-full'>
                                    <pre className=""><span className="code-editor-line-mktg d-inline-block"><span
                                        className="pl-k">import</span> <span className="pl-s1">{language}</span> <span
                                        className="pl-c1">from</span> <span
                                        className="pl-c1">'@{language}'</span></span></pre>
                                        <pre className=""><motion.span variants={container} initial='hidden'
                                                                       whileInView='show'
                                                                       className="code-editor-line-mktg d-inline-block"><motion.span
                                            variants={item} className="pl-k js-type-letters">function</motion.span><motion.span
                                            variants={item} className="js-type-letters"> </motion.span><motion.span
                                            variants={item} className="pl-s1 js-type-letters">removeRepo</motion.span><motion.span
                                            variants={item} className="js-type-letters"> </motion.span><motion.span
                                            variants={item} className="pl-c1 js-type-letters">{'() {'}</motion.span><motion.span
                                            className="pl-c1 js-type-letters"></motion.span></motion.span></pre>
                                        <motion.div initial={{opacity: 0, y: 40}} whileInView={{opacity: 1, y: 0}}
                                                    transition={{delay: 1, type: 'just'}}>
                                        <pre className=" bg-[#388bfd1a]"><span><span
                                            className="pl-5">{'<Button'}</span> <span
                                            className="pl-s1">{'onClick(clickMe)>'}</span>
                                        </span></pre>
                                            <pre className=" bg-[#388bfd1a]"><span><span
                                                className="pl-k"></span> <span
                                                className="pl-s1"></span> <span className="pl-c1"></span> <span
                                                className="pl-s1"></span> <span className="pl-c1">🗑️</span> <span
                                                className="pl-c1"></span></span></pre>
                                            <pre className=" bg-[#388bfd1a]"><span><span
                                                className="pl-5">{'</Button'}</span> <span
                                                className="pl-s1">{'>'}</span> <span className="pl-c1"></span> <span
                                                className="pl-s1"></span> <span className="pl-c1"></span> <span
                                                className="pl-c1"></span></span></pre>
                                            <pre className=" bg-[#388bfd1a]"><span><span
                                                className="pl-k"></span><span
                                                className="pl-0">{'}'}</span></span></pre>
                                            <pre className=" bg-[#388bfd1a]"><span><span
                                                className="pl-k">export</span> <span
                                                className="pl-s1">default</span>  <span
                                                className="pl-s1">removeRepo</span> <span
                                                className="pl-c1">;</span></span></pre>
                                            <div
                                                className="rounded-tl-none shadow-xl bg-[#1f6feb] absolute color-fg-on-emphasis rounded-md font-bold flex justify-center items-center gap-2 js-type-row p-2 f5 row-is-visible">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     viewBox="0 0 24 24">
                                                    <path
                                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                <a onMouseEnter={() => setHovered(true)}
                                                   onMouseLeave={() => setHovered(false)} href={url}
                                                   className=' md:text-sm text-white font-semibold inline-block'>
                                                    View on GitHub
                                                    <div
                                                        className={` ${hovered ? "w-11/12 scale-100" : "w-0 scale-0"} origin-left  transition ease-in duration-300 h-[2.5px] bg-white rounded-full`}></div>
                                                </a>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div*/}
                {/*    className={`border p-4 rounded-lg shadow-md bg-white ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}>*/}
                {/*    /!*<h2 className="text-xl font-semibold text-gray-800">{name}</h2>*!/*/}
                {/*    <p className="text-gray-600">{description ? description : 'No description available.'}</p>*/}
                {/*    <p className={`mt-2 text-sm ${isPrivate ? 'text-red-500' : 'text-green-500'}`}>*/}
                {/*        {isPrivate ? 'Private' : 'Public'}*/}
                {/*    </p>*/}
                {/*    <div className="mt-4 flex justify-between items-center">*/}

                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            checked={isSelected}*/}
                {/*            onChange={onSelect}*/}
                {/*            className="form-checkbox text-blue-500"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='flex flex-col p-8 sm:p-10 justify-start text-left w-8/12'>
                    <div className='flex flex-col mb-32'>
                        <div className='flex flex-row mb-6 justify-start items-center gap-2'>
                            <p className=" text-xl md:text-2xl font-medium text-[#7d8590]">
                                <span className='text-white font-medium'>{name}</span>
                            </p>
                            <Badge
                                className={`text-sm border border-gray-700 px-3 py-1 rounded-3xl ${isPrivate ? 'text-red-500' : 'text-green-500'}`}>{isPrivate ? 'Private' : 'Public'}</Badge>
                        </div>
                        <ul className='flex flex-wrap gap-y-2 gap-x-1'>

                            {
                                topics.map((topic, index) => {
                                    return <li key={index}>
                                        <Badge
                                            className='text-xs bg-blue-700/15 hover:bg-blue-700 cursor-pointer transition-colors duration-300 text-blue-400 hover:text-blue-200 border-gray-700 px-3 py-1 rounded-3xl'>{topic}</Badge>
                                    </li>
                                })
                            }
                        </ul>
                        <p className="text-gray-600 mt-10">{description ? description : 'No description available.'}</p>
                    </div>
                    <div className='flex gap-2 justify-start items-center cursor-pointer'>
                        <p className={`w-3 h-3 rounded-full ${language === 'JavaScript' ? 'bg-yellow-300' : language === 'TypeScript' ? 'bg-blue-500' : language === 'Dart' ? 'bg-[#1FB2A5]' : language === 'Python' ? 'bg-[#3572A5]' : language === 'C#' ? 'bg-[#178600]' : language === 'HTML' ? 'bg-[#e34c26]' : language === 'CSS' ? 'bg-[#563d7c]' : language === 'Go' ? 'bg-[#00ADD8]' : ''}`}></p>
                        <div className='flex justify-center items-center gap-5 text-gray-300 font-medium'>
                            <p className=' md:text-sm inline-block'>
                                {language}
                            </p>
                            <RepoStars>{stargazers_count}</RepoStars>
                        </div>
                    </div>
                </div>
            </div>
        </HoverCard>
    )
}

