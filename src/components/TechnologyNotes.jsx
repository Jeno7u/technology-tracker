import React, { useEffect, useState, useRef } from "react";
import "./TechnologyNotes.css";

function TechnologyNotes({ notes = "", onChange, ariaLabel }) {
    const [value, setValue] = useState(notes);
    const saveTimeout = useRef(null);

    useEffect(() => {
        setValue(notes || "");
    }, [notes]);

    // Keep a ref to the latest onChange so the debounce effect doesn't
    // retrigger when the parent passes a new function reference each render.
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    // debounce changes and call the latest onChange after a short delay
    // but skip the initial effect on mount to avoid writing the same value
    // back to the parent immediately
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            if (onChangeRef.current) onChangeRef.current(value);
        }, 400);

        return () => {
            if (saveTimeout.current) clearTimeout(saveTimeout.current);
        };
    }, [value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const stopBubbling = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="technology-notes">
            <textarea
                aria-label={ariaLabel || "Technology notes"}
                className="technology-notes__input"
                value={value}
                placeholder="Add notes..."
                onChange={handleChange}
                onClick={stopBubbling}
                onKeyDown={stopBubbling}
                onFocus={stopBubbling}
                onBlur={() => {
                    // flush pending save on blur
                    if (saveTimeout.current) clearTimeout(saveTimeout.current);
                    if (onChangeRef.current) onChangeRef.current(value);
                }}
            />
        </div>
    );
}

export default TechnologyNotes;
