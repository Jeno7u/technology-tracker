import "../App.css";

import ProgressHeader from "../components/ProgressHeader";
import QuickActions from "../components/QuickActions";
import FilterTechnologies from "../components/FilterTechnologies";
import TechnologyCard from "../components/TechnologyCard";

function Home({
    technologies,
    setTechnologies,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
}) {
    const filterByStatusFunction = (technologie) => {
        if (filter === "all") return true;
        if (filter === "not-started")
            return technologie.status === "not-started";
        if (filter === "in-progress")
            return technologie.status === "in-progress";
        if (filter === "completed") return technologie.status === "completed";
        return true;
    };

    const filterByStatus = (technologies) => {
        return technologies.filter((technologie) =>
            filterByStatusFunction(technologie, filter)
        );
    };

    const filterFunction = (technologie) => {
        if (!searchQuery) return true;

        const q = searchQuery.toLowerCase();
        return (
            (technologie.title &&
                technologie.title.toLowerCase().includes(q)) ||
            (technologie.description &&
                technologie.description.toLowerCase().includes(q))
        );
    };

    const filterTechnologies = (technologies) => {
        const filteredByStatus = filterByStatus(technologies);

        const filteredTechnologies = filteredByStatus.filter((technologie) => {
            return filterFunction(technologie);
        });

        return filteredTechnologies;
    };

    const filteredTechnologies = filterTechnologies(technologies);

    return (
        <div>
            <ProgressHeader technologies={technologies} />

            <QuickActions
                technologies={technologies}
                setTechnologies={setTechnologies}
            />
            <FilterTechnologies
                filteredTechnologies={filteredTechnologies}
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <TechnologyCard
                technologies={filteredTechnologies}
                setTechnologies={setTechnologies}
            />
        </div>
    );
}

export default Home;
