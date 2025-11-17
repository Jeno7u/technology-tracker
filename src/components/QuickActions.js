import React from "react";
import "./QuickActions.css";

function QuickActions({ onMarkAll, onResetAll, onRandomAdvance }) {
    return (
        <div className="quick-actions">
            <button className="qa-btn qa--primary" onClick={onMarkAll}>
                Отметить все как выполненные
            </button>
            <button className="qa-btn" onClick={onResetAll}>
                Сбросить все статусы
            </button>
            <button className="qa-btn" onClick={onRandomAdvance}>
                Случайный выбор следующей технологии
            </button>
        </div>
    );
}

export default QuickActions;
