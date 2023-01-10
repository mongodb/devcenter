import { createContext, ReactNode, useContext, useState } from 'react';

export const ModalContext = createContext<{
    component: JSX.Element | null;
    closeModal: () => void;
    openModal: (modal: JSX.Element) => void;
}>({
    component: null,
    closeModal: () => <></>,
    openModal: modal => modal,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<JSX.Element | null>(null);

    const openModal = (component: JSX.Element) => {
        setModal(component);
    };

    const closeModal = () => setModal(null);

    return (
        <ModalContext.Provider
            value={{
                component: modal,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => useContext(ModalContext);
