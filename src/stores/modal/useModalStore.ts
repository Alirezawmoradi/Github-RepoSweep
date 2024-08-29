import {create} from "zustand";
import {ModalState} from "@/stores/modal/modal-state.types";

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,

    actions: {
        openModal: () => set({isModalOpen: true}),
        closeModal: () => (set({isModalOpen: false})),
    }
}))