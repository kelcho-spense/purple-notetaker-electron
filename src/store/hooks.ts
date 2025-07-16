import { useStore } from '@tanstack/react-store';
import { notesStore } from './index';
import { notesActions, notesSelectors } from './actions';
import { Note } from '../types';

// Custom hook to use the notes store
export const useNotesStore = () => {
    // Subscribe to the entire store state
    const { notes, loading, error } = useStore(notesStore);

    return {
        // State
        notes,
        loading,
        error,

        // Actions
        loadNotes: notesActions.loadNotes,
        addNote: notesActions.addNote,
        deleteNote: notesActions.deleteNote,
        updateNote: notesActions.updateNote,
        clearNotes: notesActions.clearNotes,

        // Selectors
        getNotesCount: () => notesSelectors.getNotesCount(),
        getNoteById: (id: string) => notesSelectors.getNoteById(id),
        searchNotes: (query: string) => notesSelectors.searchNotes(query),
        getNotesSortedByDate: (ascending = false) => notesSelectors.getNotesSortedByDate(ascending)
    };
};

// Optimized hook for specific store slices to prevent unnecessary re-renders
export const useNotesStoreSlice = <T>(
    selector: (state: { notes: Note[]; loading: boolean; error: string | null }) => T
) => {
    return useStore(notesStore, selector);
};

// Specific hooks for individual pieces of state
export const useNotes = () => useStore(notesStore, (state) => state.notes);
export const useNotesLoading = () => useStore(notesStore, (state) => state.loading);
export const useNotesError = () => useStore(notesStore, (state) => state.error);

// Hook for notes count (computed value)
export const useNotesCount = () => useStore(notesStore, (state) => state.notes.length);

// Hook for searching notes
export const useSearchNotes = (query: string) => {
    return useStore(notesStore, (state) =>
        state.notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        )
    );
};
