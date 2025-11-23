import { useState } from "react";

function useFilterTechnologies(technologies) {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredByStatus = technologies.filter((technologie) => {
        if (filter === "all") return true;
        if (filter === "not-started")
            return technologie.status === "not-started";
        if (filter === "in-progress")
            return technologie.status === "in-progress";
        if (filter === "completed") return technologie.status === "completed";
        return true;
    });

    const filteredTechnologies = filteredByStatus.filter((technologie) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (technologie.title &&
                technologie.title.toLowerCase().includes(q)) ||
            (technologie.description &&
                technologie.description.toLowerCase().includes(q))
        );
    });

    return {
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        filteredTechnologies,
    };
}

export default useFilterTechnologies;
