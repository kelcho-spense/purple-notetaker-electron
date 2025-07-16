import React from 'react';
import { useNoteForm } from '../hooks';

interface NoteFormProps {
    onAddNote: (title: string, description: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
    const {
        formData,
        updateTitle,
        updateDescription,
        isValid,
        handleSubmit
    } = useNoteForm();

    return (
        <section className="note-form">
            <h2>Create New Note</h2>
            <form onSubmit={handleSubmit(onAddNote)}>
                <div className="form-group">
                    <label htmlFor="noteTitle">Note Title</label>
                    <input
                        type="text"
                        id="noteTitle"
                        placeholder="Enter note title..."
                        value={formData.title}
                        onChange={(e) => updateTitle(e.target.value)}
                        required
                        aria-describedby="title-hint"
                    />
                    <span id="title-hint" className="sr-only">
                        Enter a descriptive title for your note
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="noteDesc">Description</label>
                    <textarea
                        id="noteDesc"
                        placeholder="Enter note description..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => updateDescription(e.target.value)}
                        required
                        aria-describedby="desc-hint"
                    />
                    <span id="desc-hint" className="sr-only">
                        Enter the main content of your note
                    </span>
                </div>
                <button
                    type="submit"
                    className="add-btn"
                    disabled={!isValid}
                    aria-describedby="submit-hint"
                >
                    Add Note
                </button>
                <span id="submit-hint" className="sr-only">
                    Click to create a new note with the entered title and description
                </span>
            </form>
        </section>
    );
};

export default NoteForm;
