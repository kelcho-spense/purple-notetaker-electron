import React from 'react';
import { useNotes } from './hooks';
import { Header, NoteForm, NotesSection } from './components';

const App: React.FC = () => {
    const { notes, addNote, deleteNote, loading, error } = useNotes();

    return (
        <div className="app">
            <Header />
            <NoteForm onAddNote={addNote} />
            <NotesSection
                notes={notes}
                loading={loading}
                error={error}
                onDeleteNote={deleteNote}
            />
        </div>
    );
};

export default App;
