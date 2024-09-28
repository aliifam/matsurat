import { createContext, useState, useEffect, ReactNode } from "react";

// Definisikan tipe untuk context value
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
  fontSize: string;
  changeFontSize: (size: string) => void;
  latinVisible: boolean;
  toggleLatin: () => void;
  translationVisible: boolean;
  toggleTranslation: () => void;
}

// Definisikan tipe untuk props provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Membuat Context
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  // Cek localStorage untuk tema dan ukuran font
  const getInitialTheme = (): string =>
    localStorage.getItem("theme") || "light";
  const getInitialFontSize = (): string =>
    localStorage.getItem("fontSize") || "medium";
  const getInitialLatin = (): boolean =>
    localStorage.getItem("latinVisible") === "true" || false;
  const getInitialTranslation = (): boolean =>
    localStorage.getItem("translationVisible") === "true" || false;

  // State untuk tema dan ukuran font
  const [theme, setTheme] = useState<string>(getInitialTheme);
  const [fontSize, setFontSize] = useState<string>(getInitialFontSize);
  const [latinVisible, setLatinVisible] = useState<boolean>(getInitialLatin);
  const [translationVisible, setTranslationVisible] = useState<boolean>(
    getInitialTranslation
  );

  // Mengupdate localStorage setiap kali tema atau ukuran font berubah
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("latinVisible", latinVisible.toString());
    localStorage.setItem("translationVisible", translationVisible.toString());
  }, [theme, fontSize, latinVisible, translationVisible]);

  // Toggle tema antara light dan dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Mengatur ukuran font
  const changeFontSize = (size: string) => {
    setFontSize(size);
  };

  // Toggle latin
  const toggleLatin = () => {
    setLatinVisible(!latinVisible);
  };

  // Toggle translation
  const toggleTranslation = () => {
    setTranslationVisible(!translationVisible);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        changeFontSize,
        latinVisible,
        toggleLatin,
        translationVisible,
        toggleTranslation,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
