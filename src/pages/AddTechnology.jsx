import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTechnology.css";
import { useNotifications } from "../components/Notifications";

function AddTechnology({ technologies = [], setTechnologies }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("not-started");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("not-started");
        setNotes("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            showNotification({
                message: "Введите название технологии",
                severity: "warning",
            });
            return;
        }
        setSubmitting(true);
        try {
            const nextId =
                Array.isArray(technologies) && technologies.length > 0
                    ? Math.max(...technologies.map((t) => t.id)) + 1
                    : 1;
            const newTech = {
                id: nextId,
                title: title.trim(),
                description: description.trim(),
                status,
                notes: notes.trim(),
            };

            if (typeof setTechnologies === "function") {
                setTechnologies((prev) => {
                    const next = Array.isArray(prev)
                        ? [...prev, newTech]
                        : [newTech];
                    try {
                        localStorage.setItem(
                            "techTrackerData",
                            JSON.stringify(next)
                        );
                    } catch (err) {
                        // ignore storage errors
                    }
                    return next;
                });
            }

            showNotification({
                message: "Технология добавлена",
                severity: "success",
            });
            resetForm();
            navigate("/technologies");
        } catch (err) {
            console.error(err);
            showNotification({
                message: "Не удалось добавить технологию",
                severity: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add-page page">
            <div className="add-card">
                <h1>Добавить технологию</h1>
                <form className="add-form" onSubmit={handleSubmit}>
                    <label className="field">
                        <span className="label">Название</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Например: React hooks"
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="label">Краткое описание</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Чем занимается технология и зачем её изучать"
                            rows={3}
                        />
                    </label>

                    <label className="field inline">
                        <span className="label">Статус</span>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="not-started">Не начато</option>
                            <option value="in-progress">В процессе</option>
                            <option value="completed">Завершено</option>
                        </select>
                    </label>

                    <label className="field">
                        <span className="label">Заметки</span>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Дополнительные заметки"
                            rows={4}
                        />
                    </label>

                    <div className="form-actions">
                        <button
                            className="btn"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Сохраняем..." : "Добавить"}
                        </button>
                        <button
                            className="btn btn-ghost"
                            type="button"
                            onClick={() => {
                                resetForm();
                                navigate(-1);
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTechnology;
