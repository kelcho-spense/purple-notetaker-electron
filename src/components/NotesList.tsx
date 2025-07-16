import React from 'react';
import NoteItem from './NoteItem';
import { Card, CardContent } from './ui/card';
import { FileText, Plus } from 'lucide-react';
import { useNotes } from '@/store';

const NotesList: React.FC = () => {
    const notes = useNotes();

    if (notes.length === 0) {
        return (
            <Card className="bg-muted/50 border-dashed border-2 border-muted-foreground/25">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No notes yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first note to get started!</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Plus className="h-4 w-4" />
                        <span>Use the form above to add a new note</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                />
            ))}
        </div>
    );
};

export default NotesList;
