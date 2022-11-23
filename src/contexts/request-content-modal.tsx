import { createContext, ReactNode, useContext, useState } from 'react';
import { requestContentModalStages } from '../components/request-content-modal';

export const RequestContentModalContext = createContext<{
    modalStage: requestContentModalStages;
    setModalStage: (stage: requestContentModalStages) => void;
}>({
    modalStage: 'closed',
    setModalStage: () => null,
});

export function RequestContentModalProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [modalStage, setModalStage] =
        useState<requestContentModalStages>('closed');

    return (
        <RequestContentModalContext.Provider
            value={{
                modalStage,
                setModalStage: stage => setModalStage(stage),
            }}
        >
            {children}
        </RequestContentModalContext.Provider>
    );
}

export const useRequestContentModal = () =>
    useContext(RequestContentModalContext);
