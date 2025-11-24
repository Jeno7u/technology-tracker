import React, { useState } from "react";
import "./QuickActions.css";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { nextStatus } from "../utils/utils";

function QuickActions({ technologies, setTechnologies }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({});

    const openConfirm = (title, message, onConfirm) => {
        setConfirmConfig({ title, message, onConfirm });
        setConfirmOpen(true);
    };

    const onMarkAll = () => {
        setTechnologies((prev) =>
            prev.map((t) => ({ ...t, status: "completed" }))
        );
    };

    const onResetAll = () => {
        setTechnologies((prev) =>
            prev.map((t) => ({ ...t, status: "not-started" }))
        );
    };

    const onRandomAdvance = () => {
        setTechnologies((prev) => {
            if (prev.length === 0) return prev;
            const idx = Math.floor(Math.random() * prev.length);
            return prev.map((t, i) =>
                i === idx ? { ...t, status: nextStatus(t.status) } : t
            );
        });
    };

    const handleMarkAll = () => {
        openConfirm(
            "Отметить все как выполненные",
            "Вы уверены, что хотите отметить все технологии как выполненные?",
            () => {
                onMarkAll && onMarkAll();
                setConfirmOpen(false);
            }
        );
    };

    const handleResetAll = () => {
        openConfirm(
            "Сбросить все статусы",
            "Это действие сбросит статусы всех технологий. Продолжить?",
            () => {
                onResetAll && onResetAll();
                setConfirmOpen(false);
            }
        );
    };

    const onExport = () => {
        try {
            const dataStr = JSON.stringify(technologies, null, 2);
            const blob = new Blob([dataStr], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "technologies-export.json";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.warn("Export failed:", e);
        }
    };

    return (
        <div className="quick-actions">
            <Button variant="primary" onClick={handleMarkAll}>
                Отметить все как выполненные
            </Button>

            <Button onClick={handleResetAll}>Сбросить все статусы</Button>

            <Button onClick={onRandomAdvance}>Случайное изменение</Button>

            <Button onClick={onExport}>Экспорт данных</Button>

            <ConfirmModal
                open={confirmOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                onConfirm={() =>
                    confirmConfig.onConfirm && confirmConfig.onConfirm()
                }
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
}

export default QuickActions;
