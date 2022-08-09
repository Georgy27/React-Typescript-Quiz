import React, { useState, useContext, useEffect } from "react";
import useQuiz from "./hooks/useQuiz";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext<ReturnType<typeof useQuiz> | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const quiz = useQuiz();
  return <AppContext.Provider value={quiz}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext)!;
};

export { AppContext, AppProvider };
