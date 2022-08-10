import React, { useContext } from "react";
import useQuiz from "./hooks/useQuiz";

const AppContext = React.createContext<ReturnType<typeof useQuiz> | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const quiz = useQuiz();
  return <AppContext.Provider value={quiz}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext)!;
};

export { AppContext, AppProvider };
