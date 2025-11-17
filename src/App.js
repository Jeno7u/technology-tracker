import React, { useState } from "react";
import TechnologyCard from "./components/TechnologyCard.js";
import ProgressHeader from "./components/ProgressHeader";
import QuickActions from "./components/QuickActions";
import RegistrationForm from "./RegistrationForm.jsx";
import "./App.css";

const initialTechnologies = [
    {
        id: 1,
        title: "React Components",
        description: "Изучение базовых компонентов",
        status: "completed",
    },
    {
        id: 2,
        title: "JSX Syntax",
        description: "Освоение синтаксиса JSX",
        status: "in-progress",
    },
    {
        id: 3,
        title: "State Management",
        description: "Работа с состоянием компонентов",
        status: "not-started",
    },
];

function nextStatus(current) {
    const order = ["not-started", "in-progress", "completed"];
    const idx = order.indexOf(current);
    return order[(idx + 1) % order.length];
}

function App() {
    const [technologies, setTechnologies] = useState(initialTechnologies);
    const [filter, setFilter] = useState("all");

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

    const filtered = technologies.filter((t) => {
        if (filter === "all") return true;
        if (filter === "not-started") return t.status === "not-started";
        if (filter === "in-progress") return t.status === "in-progress";
        if (filter === "completed") return t.status === "completed";
        return true;
    });

    return (
        <div className="App">
            <div className="container">
                <ProgressHeader technologies={technologies} />

                <QuickActions
                    onMarkAll={markAllCompleted}
                    onResetAll={resetAllStatuses}
                    onRandomAdvance={randomAdvance}
                />

                <div
                    className="filters"
                    role="tablist"
                    aria-label="Filter technologies"
                >
                    <button
                        className={`filter-btn ${
                            filter === "all" ? "active" : ""
                        }`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${
                            filter === "not-started" ? "active" : ""
                        }`}
                        onClick={() => setFilter("not-started")}
                    >
                        Not started
                    </button>
                    <button
                        className={`filter-btn ${
                            filter === "in-progress" ? "active" : ""
                        }`}
                        onClick={() => setFilter("in-progress")}
                    >
                        In progress
                    </button>
                    <button
                        className={`filter-btn ${
                            filter === "completed" ? "active" : ""
                        }`}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                </div>

                <TechnologyCard
                    technologies={filtered}
                    onToggleStatus={toggleStatus}
                />

                <RegistrationForm />
            </div>
        </div>
    );
}

export default App;
