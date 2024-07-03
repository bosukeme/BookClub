import React from "react";
import "../styles/Note.css"


function Note({ note, onDelete, onUpdate }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <h4 className="note-title">{note.title}</h4>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>

            <button className="update-button" onClick={() => {
                const updatedTitle = prompt("Update Title: ", note.title);
                const updatedContent = prompt("Update content:", note.content);
                if (updatedTitle && updatedContent) {
                    onUpdate(note.id, updatedTitle, updatedContent);
                }
            }}>
                Update
            </button>
			
            
        </div>
    );
}

export default Note