import { useState, useEffect } from 'react';
import { Note } from '../types';
import { ElectronStorageService } from '../services';
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

    // Load notes from storage on mount
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load notes using the new storage service
                const loadedNotes = await ElectronStorageService.loadNotes();
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

    // Save notes to storage whenever notes change
    useEffect(() => {
        if (!loading) {
            // Use setTimeout to avoid blocking the UI
            setTimeout(async () => {
                try {
                    await ElectronStorageService.saveNotes(notes);
                } catch (error) {
                    console.error('Error saving notes:', error);
                }
            }, 0);
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
            setNotes(prevNotes => {
                const updatedNotes = prevNotes.filter(note => note.id !== id);
                console.log('Deleted note:', id, 'Remaining notes:', updatedNotes.length);
                return updatedNotes;
            });
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
