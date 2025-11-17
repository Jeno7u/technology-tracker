import React from "react";
import "./ConfirmModal.css";
import Button from "./Button";

function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div
            className="confirm-modal__backdrop"
            role="dialog"
            aria-modal="true"
        >
            <div className="confirm-modal">
                {title && <h3 className="confirm-modal__title">{title}</h3>}
                <div className="confirm-modal__body">{message}</div>
                <div className="confirm-modal__actions">
                    <Button onClick={onCancel}>Отмена</Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Подтвердить
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
