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
            if (!saved || saved === 'null' || saved === 'undefined') {
                return [];
            }

            const parsedNotes = JSON.parse(saved);

            // Validate that parsedNotes is an array
            if (!Array.isArray(parsedNotes)) {
                console.warn('Invalid notes data format, resetting to empty array');
                this.clearNotes();
                return [];
            }

            return parsedNotes.map((note: unknown) => {
                // Validate note structure
                if (!note || typeof note !== 'object') {
                    console.warn('Invalid note structure detected, skipping:', note);
                    return null;
                }

                const noteObj = note as Record<string, unknown>;
                if (!noteObj.id || !noteObj.title || !noteObj.description) {
                    console.warn('Invalid note structure detected, skipping:', note);
                    return null;
                }

                return {
                    id: String(noteObj.id),
                    title: String(noteObj.title),
                    description: String(noteObj.description),
                    createdAt: new Date(String(noteObj.createdAt))
                };
            }).filter(note => note !== null) as Note[];
        } catch (error) {
            console.error('Error loading notes:', error);
            // Clear corrupted data
            this.clearNotes();
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
