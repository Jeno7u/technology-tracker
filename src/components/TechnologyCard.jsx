import "./TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes";

function TechnologyCard({ technologies, onToggleStatus, onUpdateNotes }) {
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

                            <div className="technology-card__notes">
                                <div className="technology-card__notes-header">
                                    <strong>Notes</strong>
                                </div>
                                <TechnologyNotes
                                    notes={technologie.notes}
                                    ariaLabel={`Notes for ${technologie.title}`}
                                    onChange={(val) =>
                                        onUpdateNotes &&
                                        onUpdateNotes(technologie.id, val)
                                    }
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default TechnologyCard;
