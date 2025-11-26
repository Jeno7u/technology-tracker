import { useState, useEffect } from "react";

function useCatcodeValueApi({ codeValue }) {
    const [imgUrl, setImgUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!codeValue) return;
        let cancelled = false;
        let objectUrl = null;

        async function loadImage() {
            setLoading(true);
            setError(null);
            setImgUrl(null);
            try {
                const response = await fetch(
                    `https://api.allorigins.win/get?url=https://http.cat/${codeValue}.jpg`
                );
                console.log(`https://http.cat/${codeValue}.jpg`);
                if (!response.ok) throw new Error("Image failed to load");

                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);
                if (!cancelled) setImgUrl(objectUrl);
            } catch (err) {
                if (!cancelled) setError(err.message || "Error loading image");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadImage();

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [codeValue]);

    return { loading, error, imgUrl };
}

export default useCatcodeValueApi;
