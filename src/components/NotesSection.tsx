import React from 'react';
import { Note } from '../types';
import NotesList from './NotesList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

interface NotesSectionProps {
    notes: Note[];
    loading: boolean;
    error: string | null;
    onDeleteNote: (id: string) => void;
    onRetry?: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
    notes,
    loading,
    error,
    onDeleteNote,
    onRetry
}) => {
    return (
        <section className="notes-section">
            <h2>Your Notes</h2>

            {error && (
                <ErrorMessage message={error} onRetry={onRetry} />
            )}

            {loading ? (
                <Loading message="Loading your notes..." />
            ) : (
                <NotesList
                    notes={notes}
                    onDeleteNote={onDeleteNote}
                />
            )}
        </section>
    );
};

export default NotesSection;
