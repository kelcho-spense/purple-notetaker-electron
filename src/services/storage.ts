import { Note } from '../types';

const STORAGE_KEY = 'purple-notes';

export class StorageService {
    /**
     * Loads notes from localStorage
     * @returns {Note[]} Array of notes
     */
    static loadNotes(): Note[] {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return [];

            const parsedNotes = JSON.parse(saved);
            return parsedNotes.map((note: { id: string, title: string, description: string, createdAt: string }) => ({
                ...note,
                createdAt: new Date(note.createdAt)
            }));
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    }

    /**
     * Saves notes to localStorage
     * @param notes - Array of notes to save
     */
    static saveNotes(notes: Note[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    }

    /**
     * Clears all notes from localStorage
     */
    static clearNotes(): void {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing notes:', error);
        }
    }
}
