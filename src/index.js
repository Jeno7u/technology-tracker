import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppThemeProvider from "./theme/ThemeProvider";
import { NotificationsProvider } from "./components/Notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppThemeProvider>
            <NotificationsProvider>
                <App />
            </NotificationsProvider>
        </AppThemeProvider>
    </React.StrictMode>
);
