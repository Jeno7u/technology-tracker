import "./TechnologyCard.css";
import TechnologyNotes from "./TechnologyNotes";
import { nextStatus } from "../utils/utils";

function TechnologyCard({ technologies, setTechnologies }) {
    const onToggleStatus = (id) => {
        setTechnologies((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: nextStatus(t.status) } : t
            )
        );
    };

    const onChangeNotes = (techId, newNotes) => {
        setTechnologies((prevTech) =>
            prevTech.map((tech) =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
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
                            onClick={() => onToggleStatus(technologie.id)}
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
                                    onChangeNotes={onChangeNotes}
                                    techId={technologie.id}
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
