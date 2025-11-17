import React, { useState } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import "./App.css";
import useTechnologies from "./hooks/useTechnologies";

const initialTechnologies = [
    {
        id: 1,
        title: "React Components",
        description: "Изучение базовых компонентов",
        status: "completed",
        notes: "",
    },
    {
        id: 2,
        title: "JSX Syntax",
        description: "Освоение синтаксиса JSX",
        status: "in-progress",
        notes: "",
    },
    {
        id: 3,
        title: "State Management",
        description: "Работа с состоянием компонентов",
        status: "not-started",
        notes: "",
    },
];

function App() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        technologies,
        toggleStatus,
        markAllCompleted,
        resetAllStatuses,
        randomAdvance,
        updateTechnologyNotes,
    } = useTechnologies(initialTechnologies);

    // state and persistence handled by useTechnologies hook

    // handlers are provided by useTechnologies

    const filteredByStatus = technologies.filter((t) => {
        if (filter === "all") return true;
        if (filter === "not-started") return t.status === "not-started";
        if (filter === "in-progress") return t.status === "in-progress";
        if (filter === "completed") return t.status === "completed";
        return true;
    });

    // Apply search (title or description) on top of status filtering
    const filteredTechnologies = filteredByStatus.filter((t) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (t.title && t.title.toLowerCase().includes(q)) ||
            (t.description && t.description.toLowerCase().includes(q))
        );
    });

    // updateTechnologyNotes provided by useTechnologies

    return (
        <div className="App">
            <div className="container">
                <ProgressHeader technologies={technologies} />

                <QuickActions
                    onMarkAll={markAllCompleted}
                    onResetAll={resetAllStatuses}
                    onRandomAdvance={randomAdvance}
                    onExport={() => {
                        try {
                            const dataStr = JSON.stringify(
                                technologies,
                                null,
                                2
                            );
                            const blob = new Blob([dataStr], {
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
                        } catch (e) {
                            console.warn("Export failed:", e);
                        }
                    }}
                />

                <div
                    className="search-box"
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        margin: "1rem 0",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Поиск технологий..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "0.45rem 0.6rem",
                            borderRadius: 6,
                            border: "1px solid #d1d5db",
                        }}
                    />
                    <span style={{ fontSize: "0.95rem", color: "#374151" }}>
                        Найдено: {filteredTechnologies.length}
                    </span>
                </div>

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
                    technologies={filteredTechnologies}
                    onToggleStatus={toggleStatus}
                    onUpdateNotes={updateTechnologyNotes}
                />
            </div>
        </div>
    );
}

export default App;
