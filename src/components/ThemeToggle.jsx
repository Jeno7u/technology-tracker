import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../theme/ThemeProvider";

function ThemeToggle() {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <Tooltip
            title={`Переключить тему: ${
                mode === "dark" ? "тёмная" : "светлая"
            }`}
        >
            <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={toggleTheme}
                size="large"
            >
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}

export default ThemeToggle;
