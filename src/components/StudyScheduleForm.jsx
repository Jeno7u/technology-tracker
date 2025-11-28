import { useState, useEffect, useRef } from "react";
import "./StudyScheduleForm.css";

// Accessible form to set study start/end dates for a selected technology
function StudyScheduleForm({ technologies = [], setTechnologies }) {
    const [techId, setTechId] = useState(technologies[0]?.id ?? "");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [errors, setErrors] = useState({});
    const liveRef = useRef(null);

    useEffect(() => {
        // preload selected tech dates if present
        const tech = technologies.find((t) => t.id === Number(techId));
        if (tech) {
            if (tech.studyStart) setStart(tech.studyStart);
            if (tech.studyEnd) setEnd(tech.studyEnd);
        }
    }, [techId]);

    // real-time validation
    useEffect(() => {
        const e = {};
        if (!techId) e.tech = "Выберите технологию";
        if (!start) e.start = "Начальная дата обязательна";
        if (!end) e.end = "Конечная дата обязательна";
        if (start && end) {
            const s = new Date(start);
            const en = new Date(end);
            if (s > en)
                e.range = "Дата начала должна быть раньше даты окончания";
            const diff = Math.ceil((en - s) / (1000 * 60 * 60 * 24));
            if (diff > 365) e.range = "Срок не должен превышать 365 дней";
        }
        setErrors(e);
        if (liveRef.current) {
            const msg = Object.values(e).length
                ? Object.values(e)[0]
                : "Все поля корректны";
            liveRef.current.textContent = msg;
        }
    }, [techId, start, end]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length) return;
        if (typeof setTechnologies !== "function") return;
        setTechnologies((prev) =>
            prev.map((t) =>
                t.id === Number(techId)
                    ? { ...t, studyStart: start, studyEnd: end }
                    : t
            )
        );
    };

    return (
        <form
            className="study-form"
            onSubmit={onSubmit}
            aria-labelledby="study-form-title"
        >
            <h2 id="study-form-title">План изучения</h2>

            <div className="field">
                <label htmlFor="tech-select">Технология</label>
                <select
                    id="tech-select"
                    value={techId}
                    onChange={(e) => setTechId(e.target.value)}
                    aria-invalid={!!errors.tech}
                >
                    <option value="">— выберите —</option>
                    {technologies.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.title}
                        </option>
                    ))}
                </select>
                {errors.tech && (
                    <div role="alert" className="field-error">
                        {errors.tech}
                    </div>
                )}
            </div>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="start-date">Дата начала</label>
                    <input
                        id="start-date"
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        aria-invalid={!!errors.start || !!errors.range}
                    />
                    {errors.start && (
                        <div role="alert" className="field-error">
                            {errors.start}
                        </div>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="end-date">Дата окончания</label>
                    <input
                        id="end-date"
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        aria-invalid={!!errors.end || !!errors.range}
                    />
                    {errors.end && (
                        <div role="alert" className="field-error">
                            {errors.end}
                        </div>
                    )}
                </div>
            </div>

            {errors.range && (
                <div role="alert" className="field-error">
                    {errors.range}
                </div>
            )}

            <div className="actions">
                <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={Object.keys(errors).length > 0}
                >
                    Сохранить график
                </button>
            </div>

            <div className="sr-only" aria-live="polite" ref={liveRef}></div>
        </form>
    );
}

export default StudyScheduleForm;
