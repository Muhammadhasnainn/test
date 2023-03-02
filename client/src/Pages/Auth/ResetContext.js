import { createContext, useContext, useState } from "react";

const ResetContext = createContext();

export default function ResetContextProvider({ children }) {
  const [data, setData] = useState({});

  return (
    <ResetContext.Provider value={{ data, setData }}>
      {children}
    </ResetContext.Provider>
  );
}

export function useResetContext() {
  return useContext(ResetContext);
}
