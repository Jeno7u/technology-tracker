import "./TechnologyCard.css";

function TechnologyCard({ technologies, onToggleStatus }) {
    const handleKeyDown = (e, id) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleStatus && onToggleStatus(id);
        }
    };

    return (
        <div className="technologies">
            <h2>Technologies:</h2>
            <div className="technologie-card">
                <ul>
                    {technologies.map((technologie) => (
                        <li
                            key={technologie.id}
                            className={`technology-card technology-card--${technologie.status}`}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                onToggleStatus && onToggleStatus(technologie.id)
                            }
                            onKeyDown={(e) => handleKeyDown(e, technologie.id)}
                        >
                            <div className="technology-card__title">
                                <h1>{technologie.title}</h1>
                            </div>
                            <div className="technology-card__desc">
                                <p>{technologie.description}</p>
                            </div>
                            <div
                                className={`technology-card__status status-${technologie.status}`}
                            >
                                <p>{technologie.status.replace("-", " ")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default TechnologyCard;
