import { IpcRendererEvent } from 'electron';

export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

export interface ElectronAPI {
    // App information
    getAppVersion: () => string;
    getPlatform: () => string;

    // File system operations for notes
    loadNotes: () => Promise<Note[]>;
    saveNotes: (notes: Note[]) => Promise<boolean>;

    // Window controls
    minimizeWindow: () => void;
    maximizeWindow: () => void;
    closeWindow: () => void;

    // Development helpers
    isDevelopment: () => boolean;
    openDevTools: () => void;

    // IPC communication
    sendMessage: (channel: string, ...args: unknown[]) => void;
    onMessage: (channel: string, callback: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
    removeAllListeners: (channel: string) => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
