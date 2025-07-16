import { useState, useEffect } from 'react';
import { Note } from '../types';
import { StorageService } from '../services';
import { generateId } from '../utils';

interface UseNotesReturn {
    notes: Note[];
    addNote: (title: string, description: string) => void;
    deleteNote: (id: string) => void;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook for managing notes state and operations
 * @returns {UseNotesReturn} Notes state and operations
 */
export const useNotes = (): UseNotesReturn => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load notes from localStorage on mount
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate async loading for better UX
                await new Promise(resolve => setTimeout(resolve, 100));

                const loadedNotes = StorageService.loadNotes();
                setNotes(loadedNotes);
            } catch (err) {
                setError('Failed to load notes');
                console.error('Error loading notes:', err);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    // Save notes to localStorage whenever notes change
    useEffect(() => {
        if (!loading) {
            StorageService.saveNotes(notes);
        }
    }, [notes, loading]);

    /**
     * Adds a new note
     * @param title - Note title
     * @param description - Note description
     */
    const addNote = (title: string, description: string): void => {
        try {
            const newNote: Note = {
                id: generateId(),
                title: title.trim(),
                description: description.trim(),
                createdAt: new Date()
            };

            setNotes(prevNotes => [newNote, ...prevNotes]); // Add to beginning for latest first
            setError(null);
        } catch (err) {
            setError('Failed to add note');
            console.error('Error adding note:', err);
        }
    };

    /**
     * Deletes a note by ID
     * @param id - Note ID to delete
     */
    const deleteNote = (id: string): void => {
        try {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete note');
            console.error('Error deleting note:', err);
        }
    };

    return {
        notes,
        addNote,
        deleteNote,
        loading,
        error
    };
};
