import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import TechnologyCard from "./components/TechnologyCard.jsx";
// import ProgressHeader from "./components/ProgressHeader.jsx";
// import QuickActions from "./components/QuickActions.jsx";
// import FilterTechnologies from "./components/FilterTechnologies.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";

import Home from "./pages/Home.jsx";
import TechnologyList from "./pages/TechnologyList.jsx";
import TechnologyDetail from "./pages/TechnologyDetail.jsx";
import AddTechnology from "./pages/AddTechnology.jsx";
import TechnologyProgress from "./pages/TechnologyProgress.jsx";
import TechnologySettings from "./pages/TechnologySettings.jsx";
import RandomDog from "./pages/RandomDog.jsx";

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
    const { technologies, setTechnologies } =
        useTechnologies(initialTechnologies);

    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Router>
            <div className="App">
                <div className="main-nav">
                    <NavigationMenu />
                </div>
                <div className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    technologies={technologies}
                                    setTechnologies={setTechnologies}
                                    filter={filter}
                                    setFilter={setFilter}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            }
                        />

                        <Route
                            path="/technologies"
                            element={<TechnologyList />}
                        />

                        <Route
                            path="/technology/:techId"
                            element={
                                <TechnologyDetail
                                    technologies={technologies}
                                    setTechnologies={setTechnologies}
                                />
                            }
                        />

                        <Route
                            path="/add-technology"
                            element={<AddTechnology />}
                        />

                        <Route
                            path="/progress"
                            element={
                                <TechnologyProgress
                                    technologies={technologies}
                                />
                            }
                        />

                        <Route path="/random-dog" element={<RandomDog />} />

                        <Route
                            path="/settings"
                            element={
                                <TechnologySettings
                                    technologies={technologies}
                                    setTechnologies={setTechnologies}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
