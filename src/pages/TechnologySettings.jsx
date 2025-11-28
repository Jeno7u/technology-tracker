import "./TechnologySettings.css";
import { useState } from "react";
import QuickActions from "../components/QuickActions";
import BulkEdit from "../components/BulkEdit";
import StudyScheduleForm from "../components/StudyScheduleForm";
import ModalBulkEdit from "../components/ModalBulkEdit";
import { useNotifications } from "../components/Notifications";

function TechnologySettings({ technologies = [], setTechnologies }) {
    const { showNotification } = useNotifications();
    const [bulkOpen, setBulkOpen] = useState(false);

    const validateTech = (t) => {
        if (typeof t !== "object" || t === null) return false;
        if (typeof t.id !== "number") return false;
        if (typeof t.title !== "string") return false;
        if (typeof t.description !== "string") return false;
        if (!["not-started", "in-progress", "completed"].includes(t.status))
            return false;
        return true;
    };

    const handleImport = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed)) {
                showNotification({
                    message: "Файл должен содержать массив технологий (JSON)",
                    severity: "error",
                });
                return;
            }

            const invalid = parsed.filter((p) => !validateTech(p));
            if (invalid.length > 0) {
                showNotification({
                    message: `Импорт прерван: найдено ${invalid.length} некорректных записей`,
                    severity: "error",
                });
                return;
            }

            const ok = window.confirm(
                `Импортировать ${parsed.length} технологий и заменить текущие?`
            );
            if (!ok) return;
            if (typeof setTechnologies === "function") {
                setTechnologies(parsed);
            }
            try {
                localStorage.setItem("techTrackerData", JSON.stringify(parsed));
                showNotification({
                    message: "Импорт успешно завершён",
                    severity: "success",
                });
            } catch (err) {
                showNotification({
                    message:
                        "Импорт завершён, но не удалось сохранить в localStorage",
                    severity: "warning",
                });
            }
        } catch (err) {
            console.error(err);
            showNotification({
                message: "Не удалось прочитать или распарсить файл JSON.",
                severity: "error",
            });
        }
        e.target.value = null;
    };

    const handleClearStorage = () => {
        const ok = window.confirm(
            "Это удалит сохранённые данные прогресса из localStorage. Продолжить?"
        );
        if (!ok) return;
        try {
            localStorage.removeItem("techTrackerData");
            localStorage.removeItem("technologies");
        } catch (err) {
            // ignore
        }
        if (typeof setTechnologies === "function") {
            setTechnologies([]);
        }
        showNotification({ message: "Данные удалены", severity: "info" });
    };

    return (
        <div className="settings-page page">
            <div className="settings-card">
                <h1>Настройки</h1>

                <section className="settings-section">
                    <h3>Быстрые действия</h3>
                    <QuickActions
                        technologies={technologies}
                        setTechnologies={setTechnologies}
                    />
                </section>

                <section className="settings-section">
                    <h3>Импорт / Экспорт</h3>
                    <div className="import-row">
                        <label className="file-label">
                            Импортировать JSON
                            <input
                                type="file"
                                accept="application/json"
                                onChange={handleImport}
                            />
                        </label>
                        <div className="import-actions">
                            <button
                                className="btn export-btn"
                                onClick={() => {
                                    try {
                                        const data = JSON.stringify(
                                            technologies || [],
                                            null,
                                            2
                                        );
                                        const blob = new Blob([data], {
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
                                        showNotification({
                                            message: "Экспорт сохранён",
                                            severity: "success",
                                        });
                                    } catch (err) {
                                        console.error(err);
                                        showNotification({
                                            message:
                                                "Не удалось экспортировать данные",
                                            severity: "error",
                                        });
                                    }
                                }}
                            >
                                Экспортировать
                            </button>

                            <button
                                className="btn clear-btn"
                                onClick={handleClearStorage}
                            >
                                Очистить сохранённые данные
                            </button>
                        </div>
                    </div>
                    <p className="hint">Формат: массив объектов технологий.</p>
                </section>

                <section className="settings-section">
                    <h3>Массовое редактирование</h3>
                    <div className="bulk-launch-row">
                        <p className="hint">
                            Откройте модальное окно для выбора нескольких
                            технологий и массового применения статуса.
                        </p>
                        <button
                            className="btn open-bulk-btn"
                            onClick={() => setBulkOpen(true)}
                            type="button"
                        >
                            Открыть массовое редактирование
                        </button>
                    </div>
                    <ModalBulkEdit
                        open={bulkOpen}
                        onClose={() => setBulkOpen(false)}
                        technologies={technologies}
                        setTechnologies={setTechnologies}
                    />
                </section>

                <section className="settings-section">
                    <h3>План обучения</h3>
                    <StudyScheduleForm
                        technologies={technologies}
                        setTechnologies={setTechnologies}
                    />
                </section>
            </div>
        </div>
    );
}

export default TechnologySettings;
