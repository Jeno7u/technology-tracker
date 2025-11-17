import React from "react";
import "./ProgressHeader.css";

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(
        (t) => t.status === "completed"
    ).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="progress-header">
            <div className="progress-header__stats">
                <div className="stat">
                    <div className="stat__label">Total</div>
                    <div className="stat__value">{total}</div>
                </div>
                <div className="stat">
                    <div className="stat__label">Completed</div>
                    <div className="stat__value">{completed}</div>
                </div>
                <div className="stat stat--large">
                    <div className="stat__label">Progress</div>
                    <div className="stat__value">{percent}%</div>
                </div>
            </div>

            <div className="progress-header__bar" aria-hidden="true">
                <div
                    className={`progress-header__fill ${
                        percent === 100
                            ? "full"
                            : percent >= 50
                            ? "half"
                            : "low"
                    }`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            {/* Accessibility: visible text for screen readers */}
            <div className="sr-only">{`Progress: ${percent} percent`}</div>
        </div>
    );
}

export default ProgressHeader;
