import React from "react";
import "./ModalBulkEdit.css";
import BulkEdit from "./BulkEdit";

function ModalBulkEdit({ open, onClose, technologies = [], setTechnologies }) {
    if (!open) return null;

    return (
        <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    className="modal-close"
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="modal-body">
                    <BulkEdit
                        technologies={technologies}
                        setTechnologies={setTechnologies}
                    />
                </div>

                <div className="modal-footer">
                    <button className="btn" onClick={onClose} type="button">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalBulkEdit;
