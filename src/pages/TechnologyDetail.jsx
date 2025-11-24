import "./TechnologyDetail.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TechnologyDetail({ technologies: propTechnologies, setTechnologies }) {
    const { techId } = useParams();
    const navigate = useNavigate();

    const [technology, setTechnology] = useState(null);
    const [notes, setNotes] = useState("");

    // Load technology either from props or from localStorage
    useEffect(() => {
        let tech = null;
        if (Array.isArray(propTechnologies)) {
            tech = propTechnologies.find((t) => t.id === parseInt(techId));
        } else {
            const saved =
                localStorage.getItem("techTrackerData") ||
                localStorage.getItem("technologies");
            if (saved) {
                try {
                    const list = JSON.parse(saved);
                    tech = list.find((t) => t.id === parseInt(techId));
                } catch (e) {
                    // ignore parse errors
                }
            }
        }

        if (tech) {
            setTechnology(tech);
            setNotes(tech.notes || "");
        } else {
            setTechnology(null);
        }
    }, [propTechnologies, techId]);

    const persistUpdate = (updater) => {
        if (
            typeof setTechnologies === "function" &&
            Array.isArray(propTechnologies)
        ) {
            setTechnologies((prev) =>
                prev.map((t) => (t.id === parseInt(techId) ? updater(t) : t))
            );
        } else {
            const savedKey = localStorage.getItem("techTrackerData")
                ? "techTrackerData"
                : "technologies";
            const saved = localStorage.getItem(savedKey);
            if (saved) {
                try {
                    const list = JSON.parse(saved).map((t) =>
                        t.id === parseInt(techId) ? updater(t) : t
                    );
                    localStorage.setItem(savedKey, JSON.stringify(list));
                } catch (e) {
                    // ignore
                }
            }
        }
    };

    const updateStatus = (newStatus) => {
        if (!technology) return;
        const updated = { ...technology, status: newStatus };
        setTechnology(updated);
        persistUpdate(() => ({ ...technology, status: newStatus }));
    };

    const saveNotes = () => {
        if (!technology) return;
        const updated = { ...technology, notes };
        setTechnology(updated);
        persistUpdate(() => ({ ...technology, notes }));
    };

    if (!technology) {
        return (
            <div className="page tech-detail-page">
                <div className="detail-empty">
                    <h1>Технология не найдена</h1>
                    <p>Технология с ID {techId} не существует.</p>
                    <Link to="/technologies" className="btn back-link">
                        ← Назад к списку
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page tech-detail-page">
            <div className="tech-detail-card">
                <div className="tech-detail-header">
                    <button
                        className="btn back-link"
                        onClick={() => navigate(-1)}
                    >
                        ← Назад
                    </button>
                    <h1 className="tech-title">{technology.title}</h1>
                    <span
                        className={`status-badge status-${technology.status}`}
                    >
                        {technology.status.replace("-", " ")}
                    </span>
                </div>

                <div className="tech-detail-body">
                    <section className="detail-column">
                        <h3>Описание</h3>
                        <p className="detail-description">
                            {technology.description}
                        </p>

                        <h3>Статус</h3>
                        <div className="status-buttons">
                            <button
                                onClick={() => updateStatus("not-started")}
                                className={
                                    technology.status === "not-started"
                                        ? "active"
                                        : ""
                                }
                            >
                                Не начато
                            </button>
                            <button
                                onClick={() => updateStatus("in-progress")}
                                className={
                                    technology.status === "in-progress"
                                        ? "active"
                                        : ""
                                }
                            >
                                В процессе
                            </button>
                            <button
                                onClick={() => updateStatus("completed")}
                                className={
                                    technology.status === "completed"
                                        ? "active"
                                        : ""
                                }
                            >
                                Завершено
                            </button>
                        </div>
                    </section>

                    <section className="notes-column">
                        <h3>Мои заметки</h3>
                        <textarea
                            className="notes-input"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Запишите свои заметки по этой технологии..."
                        />
                        <div className="notes-actions">
                            <button className="btn" onClick={saveNotes}>
                                Сохранить заметки
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    setNotes(technology.notes || "");
                                }}
                            >
                                Отменить
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;
