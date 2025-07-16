import React from 'react';
import { useNotes } from '@/hooks';
import { Header, NoteForm, NotesSection, LoadingScreen, CSPDebug } from '@/components';

const App: React.FC = () => {
    const { notes, addNote, deleteNote, loading, error } = useNotes();

    // Show loading screen while notes are being loaded
    if (loading) {
        return <LoadingScreen message="Loading your notes..." />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[length:60px_60px] bg-[image:radial-gradient(circle_at_center,_white_2px,_transparent_2px)]"></div>

            <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <Header />
                    <div className="space-y-8">
                        <NoteForm onAddNote={addNote} />
                        <NotesSection
                            notes={notes}
                            loading={loading}
                            error={error}
                            onDeleteNote={deleteNote}
                        />
                    </div>
                </div>
            </div>

            {/* Debug component for development */}
            <CSPDebug isDevelopment={(typeof window !== 'undefined' && window.electronAPI?.isDevelopment()) ?? false} />
        </div>
    );
};

export default App;
