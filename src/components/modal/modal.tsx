import React from "react";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {useSession} from "next-auth/react";
import {useModalStore} from "@/stores/modal/useModalStore";
import {id} from "postcss-selector-parser";

export const Modal: React.FC = () => {
    const {data: session} = useSession();
    const {repos, selectedRepos} = useRepoStore();
    const {isModalOpen} = useModalStore();
    const {handleBulkRemove} = useRepoStore((state) => state.actions);
    const {closeModal} = useModalStore((state) => state.actions);

    const selectedRepoNames = repos.filter(repo => selectedRepos.has(repo.id)).map(repo => repo.name);

    if (!isModalOpen) return null;

    const onConfirm = () => {
        handleBulkRemove(session, repos);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Confirm Bulk Remove</h2>
                <p>Are you sure you want to remove the selected repositories?</p>
                <ul className="list-inside my-4">
                    {selectedRepoNames.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};
