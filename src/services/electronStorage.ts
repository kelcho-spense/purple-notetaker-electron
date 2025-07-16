import { Note } from '../types';

export class ElectronStorageService {
    /**
     * Check if we're running in Electron environment
     */
    private static isElectron(): boolean {
        return typeof window !== 'undefined' && !!window.electronAPI;
    }

    /**
     * Loads notes from the appropriate storage (file system if Electron, localStorage otherwise)
     */
    static async loadNotes(): Promise<Note[]> {
        if (this.isElectron()) {
            try {
                return await window.electronAPI.loadNotes();
            } catch (error) {
                console.error('Error loading notes from Electron:', error);
                return this.loadFromLocalStorage();
            }
        } else {
            return this.loadFromLocalStorage();
        }
    }

    /**
     * Saves notes to the appropriate storage
     */
    static async saveNotes(notes: Note[]): Promise<boolean> {
        if (this.isElectron()) {
            try {
                const success = await window.electronAPI.saveNotes(notes);
                if (success) {
                    // Also save to localStorage as backup
                    this.saveToLocalStorage(notes);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Error saving notes to Electron:', error);
                return this.saveToLocalStorage(notes);
            }
        } else {
            return this.saveToLocalStorage(notes);
        }
    }

    /**
     * Fallback: Load from localStorage
     */
    private static loadFromLocalStorage(): Note[] {
        try {
            const saved = localStorage.getItem('purple-notes');
            if (!saved || saved === 'null' || saved === 'undefined') {
                return [];
            }

            const parsedNotes = JSON.parse(saved);
            if (!Array.isArray(parsedNotes)) {
                console.warn('Invalid notes data format, resetting to empty array');
                this.clearNotes();
                return [];
            }

            return parsedNotes.map((note: unknown) => {
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
            console.error('Error loading notes from localStorage:', error);
            this.clearNotes();
            return [];
        }
    }

    /**
     * Fallback: Save to localStorage
     */
    private static saveToLocalStorage(notes: Note[]): boolean {
        try {
            localStorage.setItem('purple-notes', JSON.stringify(notes));
            return true;
        } catch (error) {
            console.error('Error saving notes to localStorage:', error);
            return false;
        }
    }

    /**
     * Clear all notes
     */
    static clearNotes(): void {
        try {
            localStorage.removeItem('purple-notes');
        } catch (error) {
            console.error('Error clearing notes:', error);
        }
    }

    /**
     * Get app version (if available)
     */
    static getAppVersion(): string {
        if (this.isElectron()) {
            return window.electronAPI.getAppVersion();
        }
        return '1.0.0';
    }

    /**
     * Get platform information
     */
    static getPlatform(): string {
        if (this.isElectron()) {
            return window.electronAPI.getPlatform();
        }
        return 'web';
    }

    /**
     * Check if we're in development mode
     */
    static isDevelopment(): boolean {
        if (this.isElectron()) {
            return window.electronAPI.isDevelopment();
        }
        return process.env.NODE_ENV === 'development';
    }
}
