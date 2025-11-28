import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeModeContext = createContext(null);

export function AppThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        try {
            const saved = localStorage.getItem("appThemeMode");
            if (saved === "light" || saved === "dark") return saved;
        } catch (e) {}
        // fallback to prefers-color-scheme
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
            return "dark";
        return "light";
    });

    useEffect(() => {
        try {
            localStorage.setItem("appThemeMode", mode);
        } catch (e) {}
    }, [mode]);

    // reflect theme on document element so non-MUI CSS can react
    useEffect(() => {
        try {
            document.documentElement.setAttribute("data-theme", mode);
        } catch (e) {}
    }, [mode]);

    const toggleTheme = () =>
        setMode((m) => (m === "light" ? "dark" : "light"));

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const ctx = useContext(ThemeModeContext);
    if (!ctx)
        throw new Error("useThemeMode must be used within AppThemeProvider");
    return ctx;
}

export default AppThemeProvider;
