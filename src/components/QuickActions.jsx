import React, { useState } from "react";
import "./QuickActions.css";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";

function QuickActions({ onMarkAll, onResetAll, onRandomAdvance, onExport }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({});

    const openConfirm = (title, message, onConfirm) => {
        setConfirmConfig({ title, message, onConfirm });
        setConfirmOpen(true);
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
