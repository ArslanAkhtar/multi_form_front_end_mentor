"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import type { Info, Plan, AddOnsType, Wizard } from "../helpers/types";
import { steps } from "../helpers/constants";
interface AppContextData {
  wizards: Wizard[];
  setCompletedWizards: React.Dispatch<React.SetStateAction<Wizard[]>>;

  infoContext: Info | null;
  setInfoContext: React.Dispatch<React.SetStateAction<Info | null>>;

  planContext: Plan | null;
  setPlanContext: React.Dispatch<React.SetStateAction<Plan | null>>;

  addOnsContext: AddOnsType[] | [];
  setAddOnsContext: React.Dispatch<React.SetStateAction<AddOnsType[] | []>>;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [wizards, setCompletedWizards] = useState<Wizard[]>(steps);
  const [infoContext, setInfoContext] = useState<Info | null>(null);
  const [planContext, setPlanContext] = useState<Plan | null>(null);
  const [addOnsContext, setAddOnsContext] = useState<AddOnsType[] | []>([]);

  return (
    <AppContext.Provider
      value={{
        wizards,
        setCompletedWizards,
        infoContext,
        setInfoContext,
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
