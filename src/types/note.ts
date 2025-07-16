export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

export interface NoteFormData {
    title: string;
    description: string;
}
