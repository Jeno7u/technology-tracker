import { useEffect, useState, useRef } from "react";

export default function useTechnologies(initialTechnologies) {
    const [technologies, setTechnologies] = useState(initialTechnologies);

    // хранение данных о выполнении первоначального рендере
    const initialized = useRef(false);

    // выполнение загрузки данных только при первом рендере
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const saved = localStorage.getItem("techTrackerData");
            if (saved) {
                setTechnologies(JSON.parse(saved));
                console.log("Данные загружены из localStorage");
            }
        }
    }, []);

    // сохранение изменений technologies
    useEffect(() => {
        if (localStorage.getItem("techTrackerData") !== technologies) {
            localStorage.setItem(
                "techTrackerData",
                JSON.stringify(technologies)
            );
            console.log("Данные сохранены в localStorage");
        }
    }, [technologies]);

    const nextStatus = (current) => {
        const order = ["not-started", "in-progress", "completed"];
        const idx = order.indexOf(current);
        return order[(idx + 1) % order.length];
    };

    const toggleStatus = (id) => {
        setTechnologies((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: nextStatus(t.status) } : t
            )
        );
    };

    const markAllCompleted = () => {
        setTechnologies((prev) =>
            prev.map((t) => ({ ...t, status: "completed" }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies((prev) =>
            prev.map((t) => ({ ...t, status: "not-started" }))
        );
    };

    const randomAdvance = () => {
        setTechnologies((prev) => {
            if (prev.length === 0) return prev;
            const idx = Math.floor(Math.random() * prev.length);
            return prev.map((t, i) =>
                i === idx ? { ...t, status: nextStatus(t.status) } : t
            );
        });
    };

    const onChangeNote = (techId, newNotes) => {
        setTechnologies((prevTech) =>
            prevTech.map((tech) =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    return {
        technologies,
        toggleStatus,
        markAllCompleted,
        resetAllStatuses,
        randomAdvance,
        onChangeNote,
    };
}
