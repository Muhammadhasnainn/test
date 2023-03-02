import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const SettingContext = createContext();

export default function SettingContextProvider({ children }) {
  const [settings, setSetting] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const { data } = await axios.get("api/settings");
      setSetting(data?.data[0]);
    };
    getSettings();
  }, []);


  return (
    <SettingContext.Provider value={{ settings }}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingContext);
}
