import { createContext, ReactNode, useContext, useState } from 'react';

type ModalComponent = JSX.Element | null;
type ModalProps = {
    hideCloseBtn?: boolean;
    onCloseCallback?: () => Promise<void> | undefined;
};

export const ModalContext = createContext<{
    component: ModalComponent;
    props: ModalProps;
    closeModal: () => void;
    openModal: (modal: JSX.Element, props?: ModalProps) => void;
}>({
    component: null,
    props: {},
    closeModal: () => null,
    openModal: modal => modal,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<{
        component: ModalComponent;
        props: ModalProps;
    }>({
        component: null,
        props: {},
    });

    const openModal = (component: JSX.Element, props = {}) => {
        setModal({ component, props });
    };

    const closeModal = () => setModal({ component: null, props: {} });

    return (
        <ModalContext.Provider
            value={{
                component: modal.component,
                props: modal.props,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => useContext(ModalContext);
