import React, { useState, useEffect } from 'react';

// Interface for Note structure
interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

// Note Item Component
interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id);
        }
    };

    return (
        <div className="note-item">
            <div className="note-title">
                <span>{note.title}</span>
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <div className="note-desc">{note.description}</div>
            <div className="note-date">
                📅 Created: {formatDate(note.createdAt)}
            </div>
        </div>
    );
};

// Note Form Component
interface NoteFormProps {
    onAddNote: (title: string, description: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert('Please fill in both title and description!');
            return;
        }

        onAddNote(title.trim(), description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <div className="note-form">
            <h2>Create New Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="noteTitle">Note Title</label>
                    <input
                        type="text"
                        id="noteTitle"
                        placeholder="Enter note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="noteDesc">Description</label>
                    <textarea
                        id="noteDesc"
                        placeholder="Enter note description..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="add-btn">Add Note</button>
            </form>
        </div>
    );
};

// Main App Component
const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    // Load notes from localStorage on mount
    useEffect(() => {
        const loadNotes = () => {
            const saved = localStorage.getItem('purple-notes');
            if (saved) {
                try {
                    const parsedNotes = JSON.parse(saved);
                    const loadedNotes = parsedNotes.map((note: { id: string, title: string, description: string, createdAt: string }) => ({
                        ...note,
                        createdAt: new Date(note.createdAt)
                    }));
                    setNotes(loadedNotes);
                } catch (error) {
                    console.error('Error loading notes:', error);
                    setNotes([]);
                }
            }
        };

        loadNotes();
    }, []);

    // Save notes to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem('purple-notes', JSON.stringify(notes));
    }, [notes]);

    const generateId = (): string => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const addNote = (title: string, description: string) => {
        const newNote: Note = {
            id: generateId(),
            title,
            description,
            createdAt: new Date()
        };

        setNotes(prevNotes => [newNote, ...prevNotes]); // Add to beginning for latest first
    };

    const deleteNote = (id: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    return (
        <div className="app">
            <header className="header">
                <h1>📝 Purple Notes</h1>
                <p>Your personal note-taking companion</p>
            </header>

            <NoteForm onAddNote={addNote} />

            <div className="notes-section">
                <h2>Your Notes</h2>
                <div className="notes-list">
                    {notes.length === 0 ? (
                        <div className="empty-state">
                            No notes yet. Create your first note above!
                        </div>
                    ) : (
                        notes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                onDelete={deleteNote}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
