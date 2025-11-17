import { useEffect, useRef, useState } from "react";

export default function useTechnologies(initial = []) {
    // Initialize state from localStorage if available to avoid
    // overwriting stored data during first render/hydration.
    const [technologies, setTechnologies] = useState(() => {
        try {
            const saved = localStorage.getItem("techTrackerData");
            return saved ? JSON.parse(saved) : initial;
        } catch (e) {
            console.warn(
                "Failed to read techTrackerData from localStorage:",
                e
            );
            return initial;
        }
    });

    // Save on every technologies change
    useEffect(() => {
        try {
            localStorage.setItem(
                "techTrackerData",
                JSON.stringify(technologies)
            );
            console.log("useTechnologies: saved techTrackerData", technologies);
        } catch (e) {
            console.warn("Failed to save techTrackerData:", e);
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

    const updateTechnologyNotes = (techId, newNotes) => {
        // debug: log note updates
        console.log(`updateTechnologyNotes called for id=${techId}`, newNotes);
        setTechnologies((prevTech) => {
            let changed = false;
            const next = prevTech.map((tech) => {
                if (tech.id === techId) {
                    if (tech.notes === newNotes) return tech;
                    changed = true;
                    return { ...tech, notes: newNotes };
                }
                return tech;
            });
            return changed ? next : prevTech;
        });
    };

    return {
        technologies,
        setTechnologies,
        toggleStatus,
        markAllCompleted,
        resetAllStatuses,
        randomAdvance,
        updateTechnologyNotes,
    };
}
