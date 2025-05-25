/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 */

import './index.css';

// Interface for Note structure
interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

class NoteTaker {
    private notes: Note[] = [];
    private noteForm: HTMLFormElement;
    private noteTitleInput: HTMLInputElement;
    private noteDescInput: HTMLTextAreaElement;
    private notesList: HTMLElement;

    constructor() {
        this.noteForm = document.getElementById('noteForm') as HTMLFormElement;
        this.noteTitleInput = document.getElementById('noteTitle') as HTMLInputElement;
        this.noteDescInput = document.getElementById('noteDesc') as HTMLTextAreaElement;
        this.notesList = document.getElementById('notesList') as HTMLElement;

        this.loadNotes();
        this.attachEventListeners();
        this.renderNotes();
    }

    private attachEventListeners(): void {
        this.noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNote();
        });
    }

    private addNote(): void {
        const title = this.noteTitleInput.value.trim();
        const description = this.noteDescInput.value.trim();

        if (!title || !description) {
            alert('Please fill in both title and description!');
            return;
        }

        const newNote: Note = {
            id: this.generateId(),
            title,
            description,
            createdAt: new Date()
        };

        this.notes.unshift(newNote); // Add to beginning for latest first
        this.saveNotes();
        this.renderNotes();
        this.clearForm();
    }

    public deleteNote(id: string): void {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
            this.renderNotes();
        }
    }

    private renderNotes(): void {
        if (this.notes.length === 0) {
            this.notesList.innerHTML = `
        <div class="empty-state">
          No notes yet. Create your first note above!
        </div>
      `;
            return;
        }

        this.notesList.innerHTML = this.notes.map(note => `
      <div class="note-item">
        <div class="note-title">
          <span>${this.escapeHtml(note.title)}</span>
          <button class="delete-btn" onclick="noteTaker.deleteNote('${note.id}')">
            Delete
          </button>
        </div>
        <div class="note-desc">${this.escapeHtml(note.description)}</div>
        <div class="note-date">
          📅 Created: ${this.formatDate(note.createdAt)}
        </div>
      </div>
    `).join('');
    }

    private clearForm(): void {
        this.noteTitleInput.value = '';
        this.noteDescInput.value = '';
        this.noteTitleInput.focus();
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    private saveNotes(): void {
        localStorage.setItem('purple-notes', JSON.stringify(this.notes));
    }

    private loadNotes(): void {
        const saved = localStorage.getItem('purple-notes');
        if (saved) {
            try {
                const parsedNotes = JSON.parse(saved);
                this.notes = parsedNotes.map((note: { id: string, title: string, description: string, createdAt: string }) => ({
                    ...note,
                    createdAt: new Date(note.createdAt)
                }));
            } catch (error) {
                console.error('Error loading notes:', error);
                this.notes = [];
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make noteTaker globally available for delete buttons
    (window as typeof window & { noteTaker: NoteTaker }).noteTaker = new NoteTaker();
});

console.log('🎨 Purple Notes app loaded successfully!');
