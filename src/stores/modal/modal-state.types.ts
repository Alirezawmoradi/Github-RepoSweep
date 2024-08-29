export type ModalState = {
    isModalOpen: boolean,

    actions: {
        openModal: () => void;
        closeModal: () => void;
    }
}