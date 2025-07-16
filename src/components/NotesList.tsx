import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface NotesListProps {
    notes: Note[];
    onDeleteNote: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDeleteNote }) => {
    if (notes.length === 0) {
        return (
            <div className="empty-state">
                No notes yet. Create your first note above!
            </div>
        );
    }

    return (
        <div className="notes-list" role="list">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={onDeleteNote}
                />
            ))}
        </div>
    );
};

export default NotesList;
