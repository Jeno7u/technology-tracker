import { useState, useEffect } from "react";
import "./RandomDogFile.css";

function RandomDogFile({ refreshKey = 0 }) {
    const [mediaUrl, setMediaUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("https://random.dog/woof.json");
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const data = await res.json();
                if (!cancelled) setMediaUrl(data.url || "");
            } catch (err) {
                if (!cancelled) setError(err.message || "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    if (loading)
        return (
            <div className="random-dog-file">
                <p className="rd-loading">Загрузка…</p>
            </div>
        );
    if (error)
        return (
            <div className="random-dog-file">
                <p className="rd-error">Ошибка: {error}</p>
            </div>
        );
    if (!mediaUrl)
        return (
            <div className="random-dog-file">
                <p className="rd-empty">Нет данных</p>
            </div>
        );

    const ext = mediaUrl.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
    const isVideo = ["mp4", "webm", "mov"].includes(ext);

    return (
        <div className="random-dog-file">
            {isImage && (
                <img
                    className="random-dog-image"
                    src={mediaUrl}
                    alt="Random dog"
                />
            )}

            {isVideo && (
                <video className="random-dog-video" controls>
                    <source src={mediaUrl} type={`video/${ext}`} />
                </video>
            )}

            {!isImage && !isVideo && (
                <p className="rd-unknown">Unknown file type: {ext}</p>
            )}
        </div>
    );
}

export default RandomDogFile;
