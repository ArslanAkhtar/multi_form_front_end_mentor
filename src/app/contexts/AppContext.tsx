"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import type { Info, Plan, AddOns } from "../helpers/types";

interface AppContextData {
  info: Info | null;
  setInfo: React.Dispatch<React.SetStateAction<Info | null>>;

  planContext: Plan | null;
  setPlanContext: React.Dispatch<React.SetStateAction<Plan | null>>;

  addOnsContext: AddOns[] | [];
  setAddOnsContext: React.Dispatch<React.SetStateAction<AddOns[] | []>>;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Info | null>(null);
  const [planContext, setPlanContext] = useState<Plan | null>(null);
  const [addOnsContext, setAddOnsContext] = useState<AddOns[] | []>([]);

  return (
    <AppContext.Provider
      value={{
        info,
        setInfo,
        planContext,
        setPlanContext,
        addOnsContext,
        setAddOnsContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { useMyContext, AppContextProvider };
