import { createContext, useEffect, useState, type ReactNode } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
    themeName: ThemeName;
    setThemeName: (themeName: ThemeName) => void;
    toggleTheme: () => void;
}

export const state = {
    themeName: "light" as ThemeName,
    setThemeName: (themeName: ThemeName) => {},
}

export const ThemeContext = createContext<State>({
    themeName: "light",
    setThemeName: () => {},
    toggleTheme: () => {},
});

export const BookStoreThemeProvider =({children}:{children: ReactNode}) => 
{
    const [ themeName, setThemeName ] = useState<ThemeName>("light");

    const toggleTheme = () => {
        setThemeName((prev) => {
            const nextTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem(THEME_LOCALSTORAGE_KEY, nextTheme);
            return nextTheme;
        });
    };

    useEffect(()=>{
        const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
        setThemeName(
            savedThemeName || DEFAULT_THEME_NAME
        );
    }, []);

    return (
        <ThemeContext.Provider value={{themeName, setThemeName, toggleTheme}}>
            <ThemeProvider theme={getTheme(themeName)}>
                <GlobalStyle themeName={themeName} />
            {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}