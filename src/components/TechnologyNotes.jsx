import "./TechnologyNotes.css";

function TechnologyNotes({ notes = "", onChangeNotes, techId }) {
    return (
        <div className="technology-notes">
            <textarea
                className="technology-notes__input"
                value={notes}
                placeholder="Add notes..."
                onChange={(e) => onChangeNotes(techId, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
            />
        </div>
    );
}

export default TechnologyNotes;
