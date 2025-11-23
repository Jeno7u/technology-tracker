import "./FilterTechnologies.css";

function FilterTechnologies({
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTechnologies,
}) {
    return (
        <div>
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
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
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
        </div>
    );
}

export default FilterTechnologies;
