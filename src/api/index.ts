import { Note } from '../types';
import { StorageService } from '../services';
import { generateId } from '../utils';

/**
 * Note API service for handling note operations
 */
export class NoteAPI {
    /**
     * Fetches all notes from storage
     * @returns {Promise<Note[]>} Promise resolving to array of notes
     */
    static async getNotes(): Promise<Note[]> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return StorageService.loadNotes();
    }

    /**
     * Creates a new note
     * @param title - Note title
     * @param description - Note description
     * @returns {Promise<Note>} Promise resolving to the created note
     */
    static async createNote(title: string, description: string): Promise<Note> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const newNote: Note = {
            id: generateId(),
            title: title.trim(),
            description: description.trim(),
            createdAt: new Date()
        };

        const existingNotes = StorageService.loadNotes();
        const updatedNotes = [newNote, ...existingNotes];
        StorageService.saveNotes(updatedNotes);

        return newNote;
    }

    /**
     * Deletes a note by ID
     * @param id - Note ID to delete
     * @returns {Promise<boolean>} Promise resolving to success status
     */
    static async deleteNote(id: string): Promise<boolean> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const existingNotes = StorageService.loadNotes();
        const updatedNotes = existingNotes.filter(note => note.id !== id);
        StorageService.saveNotes(updatedNotes);

        return true;
    }

    /**
     * Updates an existing note
     * @param id - Note ID to update
     * @param title - New note title
     * @param description - New note description
     * @returns {Promise<Note | null>} Promise resolving to updated note or null if not found
     */
    static async updateNote(id: string, title: string, description: string): Promise<Note | null> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const existingNotes = StorageService.loadNotes();
        const noteIndex = existingNotes.findIndex(note => note.id === id);

        if (noteIndex === -1) return null;

        const updatedNote: Note = {
            ...existingNotes[noteIndex],
            title: title.trim(),
            description: description.trim()
        };

        existingNotes[noteIndex] = updatedNote;
        StorageService.saveNotes(existingNotes);

        return updatedNote;
    }
}