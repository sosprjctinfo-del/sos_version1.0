import { useState, useEffect } from "react";
import { getTheme, saveTheme } from "@/utils/storage";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
};
