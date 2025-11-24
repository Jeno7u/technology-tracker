import { useEffect, useState, useRef } from "react";

function useTechnologies(initialTechnologies = []) {
    const [technologies, setTechnologies] = useState(initialTechnologies);

    // хранение данных о выполнении первоначального рендере
    const initialized = useRef(false);

    // выполнение загрузки данных только при первом рендере
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const saved = localStorage.getItem("techTrackerData");
            if (saved) {
                setTechnologies(JSON.parse(saved));
                console.log("Данные загружены из localStorage");
            }
        }
    }, []);

    // сохранение изменений technologies
    useEffect(() => {
        if (localStorage.getItem("techTrackerData") !== technologies) {
            localStorage.setItem(
                "techTrackerData",
                JSON.stringify(technologies)
            );
            console.log("Данные сохранены в localStorage");
        }
    }, [technologies]);

    return {
        technologies,
        setTechnologies,
    };
}

export default useTechnologies;
