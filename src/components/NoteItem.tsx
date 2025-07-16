import React from 'react';
import { Note } from '../types';
import { formatDate } from '../utils';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
    const handleDelete = (): void => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id);
        }
    };

    return (
        <article className="note-item">
            <div className="note-title">
                <span>{note.title}</span>
                <button
                    className="delete-btn"
                    onClick={handleDelete}
                    aria-label={`Delete note: ${note.title}`}
                >
                    Delete
                </button>
            </div>
            <div className="note-desc" title={note.description}>
                {note.description}
            </div>
            <div className="note-date">
                <span role="img" aria-label="Calendar">📅</span>
                Created: {formatDate(note.createdAt)}
            </div>
        </article>
    );
};

export default NoteItem;
