import { useState, createContext, FunctionComponent, ReactNode } from 'react';

export const OverlayContext = createContext({
    hasOverlay: false,
    setHasOverlay: (has: boolean) => {},
});

export const OverlayProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
}) => {
    const [hasOverlay, setHasOverlay] = useState(false);
    return (
        <OverlayContext.Provider value={{ hasOverlay, setHasOverlay }}>
            {children}
        </OverlayContext.Provider>
    );
};
