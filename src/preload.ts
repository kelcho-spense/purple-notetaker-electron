// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { Note, ElectronAPI } from './types/electron';

// Security: Validate that we're running in the correct context
if (!process.contextIsolated) {
    throw new Error('Preload script must run in an isolated context');
}

// Define the app data directory
const APP_DATA_DIR = join(homedir(), 'purple-notetaker-data');

// Ensure the data directory exists
if (!existsSync(APP_DATA_DIR)) {
    mkdirSync(APP_DATA_DIR, { recursive: true });
}

// Define the notes file path
const NOTES_FILE_PATH = join(APP_DATA_DIR, 'notes.json');

// Security: Input validation helpers
const validateString = (input: unknown, maxLength = 1000): string => {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    if (input.length > maxLength) {
        throw new Error(`Input too long (max ${maxLength} characters)`);
    }
    return input.trim();
};

const validateNoteArray = (notes: unknown): Note[] => {
    if (!Array.isArray(notes)) {
        throw new Error('Notes must be an array');
    }

    return notes.map((note: unknown) => {
        if (!note || typeof note !== 'object') {
            throw new Error('Invalid note object');
        }

        const noteObj = note as Record<string, unknown>;

        return {
            id: validateString(noteObj.id, 100),
            title: validateString(noteObj.title, 200),
            description: validateString(noteObj.description, 5000),
            createdAt: new Date(String(noteObj.createdAt))
        };
    });
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const electronAPI: ElectronAPI = {
    getAppVersion: () => {
        return process.env.npm_package_version || '1.0.0';
    },

    getPlatform: () => {
        return process.platform;
    },

    loadNotes: async (): Promise<Note[]> => {
        try {
            if (existsSync(NOTES_FILE_PATH)) {
                const data = readFileSync(NOTES_FILE_PATH, 'utf-8');
                const notes = JSON.parse(data);

                // Validate the data structure
                if (Array.isArray(notes)) {
                    return notes.map(note => ({
                        ...note,
                        createdAt: new Date(note.createdAt)
                    }));
                }
            }
            return [];
        } catch (error) {
            console.error('Error loading notes from file:', error);
            return [];
        }
    },

    saveNotes: async (notes: Note[]): Promise<boolean> => {
        try {
            // Validate notes before saving
            const validatedNotes = validateNoteArray(notes);
            const data = JSON.stringify(validatedNotes, null, 2);
            writeFileSync(NOTES_FILE_PATH, data, 'utf-8');
            return true;
        } catch (error) {
            console.error('Error saving notes to file:', error);
            return false;
        }
    },

    minimizeWindow: () => {
        ipcRenderer.send('window-minimize');
    },

    maximizeWindow: () => {
        ipcRenderer.send('window-maximize');
    },

    closeWindow: () => {
        ipcRenderer.send('window-close');
    },

    isDevelopment: () => {
        return process.env.NODE_ENV === 'development';
    },

    openDevTools: () => {
        ipcRenderer.send('open-devtools');
    },

    sendMessage: (channel: string, ...args: unknown[]) => {
        ipcRenderer.send(channel, ...args);
    },

    onMessage: (channel: string, callback: (event: IpcRendererEvent, ...args: unknown[]) => void) => {
        ipcRenderer.on(channel, callback);
    },

    removeAllListeners: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
    }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electronAPI', electronAPI);
    } catch (error) {
        console.error('Failed to expose electronAPI:', error);
    }
} else {
    (window as Window & { electronAPI: ElectronAPI }).electronAPI = electronAPI;
}

// Log preload script loaded
console.log('Preload script loaded successfully');

// Global error handler for the preload script
window.addEventListener('error', (event) => {
    console.error('Preload script error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection in preload:', event.reason);
});
