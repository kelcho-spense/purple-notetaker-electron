import { notesStore } from './index';
import { Note } from '../types';
import { ElectronStorageService } from '../services';
import { generateId } from '../utils';

// Store actions
export const notesActions = {
    // Set loading state
    setLoading: (loading: boolean) => {
        notesStore.setState((state) => ({
            ...state,
            loading
        }));
    },

    // Set error state
    setError: (error: string | null) => {
        notesStore.setState((state) => ({
            ...state,
            error
        }));
    },

    // Set notes
    setNotes: (notes: Note[]) => {
        notesStore.setState((state) => ({
            ...state,
            notes
        }));
    },

    // Load notes from storage
    loadNotes: async () => {
        try {
            notesActions.setLoading(true);
            notesActions.setError(null);

            const loadedNotes = await ElectronStorageService.loadNotes();
            notesActions.setNotes(loadedNotes);
        } catch (err) {
            notesActions.setError('Failed to load notes');
            console.error('Error loading notes:', err);
        } finally {
            notesActions.setLoading(false);
        }
    },

    // Add a new note
    addNote: async (title: string, description: string) => {
        try {
            const newNote: Note = {
                id: generateId(),
                title: title.trim(),
                description: description.trim(),
                createdAt: new Date()
            };

            // Update store state optimistically
            notesStore.setState((state) => ({
                ...state,
                notes: [newNote, ...state.notes],
                error: null
            }));

            // Save to storage
            const currentNotes = notesStore.state.notes;
            await ElectronStorageService.saveNotes(currentNotes);
        } catch (err) {
            notesActions.setError('Failed to add note');
            console.error('Error adding note:', err);

            // Revert optimistic update on error
            notesActions.loadNotes();
        }
    },

    // Delete a note
    deleteNote: async (id: string) => {
        try {
            // Update store state optimistically
            notesStore.setState((state) => ({
                ...state,
                notes: state.notes.filter(note => note.id !== id),
                error: null
            }));

            // Save to storage
            const updatedNotes = notesStore.state.notes;
            await ElectronStorageService.saveNotes(updatedNotes);

            console.log('Deleted note:', id, 'Remaining notes:', updatedNotes.length);
        } catch (err) {
            notesActions.setError('Failed to delete note');
            console.error('Error deleting note:', err);

            // Revert optimistic update on error
            notesActions.loadNotes();
        }
    },

    // Update a note
    updateNote: async (id: string, title: string, description: string) => {
        try {
            // Update store state optimistically
            notesStore.setState((state) => ({
                ...state,
                notes: state.notes.map(note =>
                    note.id === id
                        ? { ...note, title: title.trim(), description: description.trim() }
                        : note
                ),
                error: null
            }));

            // Save to storage
            const updatedNotes = notesStore.state.notes;
            await ElectronStorageService.saveNotes(updatedNotes);
        } catch (err) {
            notesActions.setError('Failed to update note');
            console.error('Error updating note:', err);

            // Revert optimistic update on error
            notesActions.loadNotes();
        }
    },

    // Clear all notes
    clearNotes: async () => {
        try {
            notesStore.setState((state) => ({
                ...state,
                notes: [],
                error: null
            }));

            await ElectronStorageService.saveNotes([]);
        } catch (err) {
            notesActions.setError('Failed to clear notes');
            console.error('Error clearing notes:', err);

            // Revert optimistic update on error
            notesActions.loadNotes();
        }
    }
};

// Store selectors
export const notesSelectors = {
    // Get all notes
    getNotes: () => notesStore.state.notes,

    // Get loading state
    getLoading: () => notesStore.state.loading,

    // Get error state
    getError: () => notesStore.state.error,

    // Get notes count
    getNotesCount: () => notesStore.state.notes.length,

    // Get note by ID
    getNoteById: (id: string) => notesStore.state.notes.find(note => note.id === id),

    // Search notes by title or description
    searchNotes: (query: string) =>
        notesStore.state.notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        ),

    // Get notes sorted by creation date
    getNotesSortedByDate: (ascending = false) =>
        [...notesStore.state.notes].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return ascending ? dateA - dateB : dateB - dateA;
        })
};
