import React, { createContext, useContext, useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
    const [options, setOptions] = useState({
        open: false,
        message: "",
        severity: "info",
        autoHide: 4000,
    });

    const showNotification = useCallback(
        ({ message = "", severity = "info", autoHide = 4000 }) => {
            setOptions({ open: true, message, severity, autoHide });
        },
        []
    );

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOptions((o) => ({ ...o, open: false }));
    };

    return (
        <NotificationsContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={options.open}
                autoHideDuration={options.autoHide}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={options.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {options.message}
                </Alert>
            </Snackbar>
        </NotificationsContext.Provider>
    );
}

export function useNotifications() {
    const ctx = useContext(NotificationsContext);
    if (!ctx)
        throw new Error(
            "useNotifications must be used within NotificationsProvider"
        );
    return ctx;
}

export default NotificationsProvider;
