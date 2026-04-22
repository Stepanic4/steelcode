"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type LoadingContextType = {
  isReady: boolean;
  setIsReady: Dispatch<SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType>({
  isReady: false,
  setIsReady: () => {},
} as LoadingContextType);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
