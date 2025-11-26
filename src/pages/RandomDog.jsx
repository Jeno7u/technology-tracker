import { useState } from "react";

import RandomDogFile from "../components/RandomDogFile";

import "./RandomDog.css";

function RandomDog() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey((k) => k + 1);
    };

    return (
        <div className="page randomdog-page">
            <div className="page-header">
                <h1>Random Dog Viewer</h1>
            </div>

            <div className="dogfile-preview">
                <RandomDogFile refreshKey={refreshKey} />
            </div>

            <div className="dogfile-refresh">
                <button className="btn" onClick={handleRefresh}>
                    Новый собакен
                </button>
            </div>
        </div>
    );
}

export default RandomDog;
