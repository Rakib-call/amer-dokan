import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const { data, error } = await supabase.from("settings").select("*").eq("id", 1).single();
    if (!error) setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
