import "./TechnologyProgress.css";
import ProgressHeader from "../components/ProgressHeader";

function TechnologyProgress({ technologies = [] }) {
    const total = technologies.length;
    const counts = {
        "not-started": technologies.filter((t) => t.status === "not-started")
            .length,
        "in-progress": technologies.filter((t) => t.status === "in-progress")
            .length,
        completed: technologies.filter((t) => t.status === "completed").length,
    };

    return (
        <section className="technology-progress">
            <ProgressHeader technologies={technologies} />

            <div className="progress-insights">
                <div className="status-breakdown">
                    <div className="breakdown-item">
                        <span className="label">Не начато</span>
                        <span className="value">{counts["not-started"]}</span>
                    </div>
                    <div className="breakdown-item">
                        <span className="label">В процессе</span>
                        <span className="value">{counts["in-progress"]}</span>
                    </div>
                    <div className="breakdown-item">
                        <span className="label">Завершено</span>
                        <span className="value">{counts.completed}</span>
                    </div>
                </div>

                <div className="segmented-bar" aria-hidden="true">
                    {total === 0 ? (
                        <div className="empty">Нет данных</div>
                    ) : (
                        <>
                            <div
                                className="seg seg-not-started"
                                style={{
                                    width: `${
                                        (counts["not-started"] / total) * 100
                                    }%`,
                                }}
                            />
                            <div
                                className="seg seg-in-progress"
                                style={{
                                    width: `${
                                        (counts["in-progress"] / total) * 100
                                    }%`,
                                }}
                            />
                            <div
                                className="seg seg-completed"
                                style={{
                                    width: `${
                                        (counts.completed / total) * 100
                                    }%`,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TechnologyProgress;
