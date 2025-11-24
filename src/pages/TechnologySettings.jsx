import "./TechnologySettings.css";
import QuickActions from "../components/QuickActions";

function TechnologySettings({ technologies = [], setTechnologies }) {
    const handleImport = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed)) {
                alert("Файл должен содержать массив технологий (JSON)");
                return;
            }
            const ok = window.confirm(
                `Импортировать ${parsed.length} технологий и заменить текущие?`
            );
            if (!ok) return;
            if (typeof setTechnologies === "function") {
                setTechnologies(parsed);
            }
            // persist to localStorage as a fallback
            try {
                localStorage.setItem("techTrackerData", JSON.stringify(parsed));
            } catch (err) {
                // ignore storage errors
            }
            alert("Импорт завершён.");
        } catch (err) {
            console.error(err);
            alert("Не удалось прочитать или распарсить файл JSON.");
        }
        // reset input value so the same file can be selected again
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
        alert("Данные удалены. Обновите страницу, чтобы увидеть изменения.");
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
                        <button
                            className="btn clear-btn"
                            onClick={handleClearStorage}
                        >
                            Очистить сохранённые данные
                        </button>
                    </div>
                    <p className="hint">Формат: массив объектов технологий.</p>
                </section>
            </div>
        </div>
    );
}

export default TechnologySettings;
