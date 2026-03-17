'use client'
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
    isReady: false,
    setIsReady: (value: boolean) => {}
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isReady, setIsReady] = useState(false);
    return (
        <LoadingContext.Provider value={{ isReady, setIsReady }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);