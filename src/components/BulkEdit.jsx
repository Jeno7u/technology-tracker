import { useState } from "react";
import "./BulkEdit.css";

function BulkEdit({ technologies = [], setTechnologies }) {
    const [selected, setSelected] = useState(new Set());
    const [newStatus, setNewStatus] = useState("completed");

    const toggle = (id) => {
        setSelected((s) => {
            const copy = new Set(s);
            if (copy.has(id)) copy.delete(id);
            else copy.add(id);
            return copy;
        });
    };

    const apply = () => {
        if (selected.size === 0) return;
        if (typeof setTechnologies !== "function") return;
        setTechnologies((prev) =>
            prev.map((t) =>
                selected.has(t.id) ? { ...t, status: newStatus } : t
            )
        );
        setSelected(new Set());
    };

    return (
        <div className="bulk-edit">
            <h3>Массовое редактирование статусов</h3>
            <div className="bulk-controls">
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    aria-label="Выберите статус для применения"
                >
                    <option value="not-started">Не начато</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Завершено</option>
                </select>
                <button
                    className="btn"
                    onClick={apply}
                    disabled={selected.size === 0}
                    aria-disabled={selected.size === 0}
                >
                    Применить
                </button>
            </div>

            <div className="bulk-list" role="list">
                {technologies.map((t) => (
                    <label key={t.id} className="bulk-item">
                        <input
                            type="checkbox"
                            checked={selected.has(t.id)}
                            onChange={() => toggle(t.id)}
                        />
                        <span className="bulk-title">{t.title}</span>
                        <span className="bulk-status">
                            {t.status.replace("-", " ")}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default BulkEdit;
