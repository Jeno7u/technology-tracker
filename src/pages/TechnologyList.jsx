import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/TechnologyCard.css";

function TechnologyList() {
    const [technologies, setTechnologies] = useState([]);

    // Загружаем технологии из localStorage (совместимость с разными ключами)
    useEffect(() => {
        const saved =
            localStorage.getItem("techTrackerData") ||
            localStorage.getItem("technologies");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setTechnologies(parsed);
            } catch (e) {
                // ignore
            }
        }
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить технологию
                </Link>
            </div>

            <div className="technologies">
                <h2>Technologies:</h2>
                <div className="technologie-card">
                    <ul>
                        {technologies.map((tech) => (
                            <li
                                key={tech.id}
                                className={`technology-card technology-card--${tech.status}`}
                            >
                                <Link
                                    to={`/technology/${tech.id}`}
                                    className="technology-link"
                                >
                                    <div className="technology-card__title">
                                        <h1>{tech.title}</h1>
                                    </div>
                                    <div className="technology-card__desc">
                                        <p>{tech.description}</p>
                                    </div>
                                    <div
                                        className={`technology-card__status status-${tech.status}`}
                                    >
                                        <p>{tech.status.replace("-", " ")}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {technologies.length === 0 && (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )}
        </div>
    );
}

export default TechnologyList;
