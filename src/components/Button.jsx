import React from "react";
import "./Button.css";

function Button({ children, variant = "default", onClick, ...rest }) {
    const className = `btn ${variant === "primary" ? "btn--primary" : ""}`;
    return (
        <button className={className} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}

export default Button;
