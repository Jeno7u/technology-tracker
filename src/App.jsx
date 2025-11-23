import "./App.css";

import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import FilterTechnologies from "./components/FilterTechnologies.jsx";

import useTechnologies from "./hooks/useTechnologies";
import useFilterTechnologies from "./hooks/useFilterTechnologies.js";

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
    const {
        technologies,
        toggleStatus,
        markAllCompleted,
        resetAllStatuses,
        randomAdvance,
        onChangeNote,
    } = useTechnologies(initialTechnologies);

    const {
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        filteredTechnologies,
    } = useFilterTechnologies(technologies);

    return (
        <div className="App">
            <div className="main-content">
                <ProgressHeader technologies={technologies} />

                <QuickActions
                    onMarkAll={markAllCompleted}
                    onResetAll={resetAllStatuses}
                    onRandomAdvance={randomAdvance}
                    technologies={technologies}
                />
                <FilterTechnologies
                    filter={filter}
                    setFilter={setFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredTechnologies={filteredTechnologies}
                />

                <TechnologyCard
                    technologies={filteredTechnologies}
                    onToggleStatus={toggleStatus}
                    onChangeNote={onChangeNote}
                />
            </div>
        </div>
    );
}

export default App;
