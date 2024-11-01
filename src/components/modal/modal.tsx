import React from "react";
import {useRepoStore} from "@/stores/repository/useRepoStore";
import {useSession} from "next-auth/react";
import {useModalStore} from "@/stores/modal/useModalStore";
import {toast} from "react-toastify";
import {Button} from "@/components/button/button";

export const Modal: React.FC<ModalProps> = ({userData}) => {
    const {data: session} = useSession();
    const {repos, selectedRepos} = useRepoStore();
    const {isModalOpen} = useModalStore();
    const {handleBulkRemove} = useRepoStore((state) => state.actions);
    const {closeModal} = useModalStore((state) => state.actions);

    const selectedRepoNames = repos.filter(repo => selectedRepos.has(repo.id)).map(repo => repo.name);

    if (!isModalOpen) return null;

    const onConfirm = async () => {
        closeModal();
        if (!userData) {
            toast.error("User data is unavailable!");
            return;
        }
        await toast.promise(
            handleBulkRemove(session, repos, userData),
            {
                pending: 'Removing repositories...',
                success: 'Repositories successfully removed!',
                error: 'Failed to remove repositories!',
            },
            {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center max-sm:px-5">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Confirm Bulk Remove</h2>
                <p>Are you sure you want to remove the selected repositories?</p>
                <ul className="list-inside my-4 max-sm:text-sm">
                    {selectedRepoNames.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
                <div className="mt-6 flex justify-end gap-4">
                    <Button
                        onClick={closeModal}
                        type='cancel'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        type='confirm'
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};
