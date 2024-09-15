import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="border-gray-700 shadow-md rounded-lg w-full p-10 mx-auto bg-[#161b22]">
            <div className="flex justify-between items-center gap-10">
                <div className="h-40 bg-slate-700 w-1/3 rounded-lg skeleton-text"
                     style={{animationDelay: '0.4s'}}></div>
                <div className="w-2/3 space-y-4">
                    <div className="flex justify-start items-center gap-5">
                        <div className="h-5 w-1/4 bg-slate-700 rounded-full skeleton-text"
                             style={{animationDelay: '0.9s'}}></div>
                        <div className="h-5 w-16 bg-slate-700 rounded-full skeleton-text"
                             style={{animationDelay: '0.6s'}}></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded skeleton-text" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 bg-slate-700 rounded w-2/3 skeleton-text"
                         style={{animationDelay: '0.4s'}}></div>
                    <div className="flex gap-2 mt-3">
                        <div className="h-1 bg-slate-700 rounded-full w-12 skeleton-text"
                             style={{animationDelay: '0.6s'}}></div>
                        <div className="h-1 bg-slate-700 rounded-full w-8 skeleton-text"
                             style={{animationDelay: '0.8s'}}></div>
                        <div className="h-1 bg-slate-700 rounded-full w-14 skeleton-text"
                             style={{animationDelay: '1s'}}></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded mt-6 skeleton-text" style={{animationDelay: '1.2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
