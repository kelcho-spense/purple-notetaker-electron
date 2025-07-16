import { Store } from '@tanstack/react-store';
import { Note } from '../types';

// Define the store state interface
export interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null
};

// Create the store
export const notesStore = new Store<NotesState>(initialState);

// Export everything from actions and hooks
export * from './actions';
export * from './hooks';
