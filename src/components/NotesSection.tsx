import React from 'react';
import { Note } from '@/types';
import NotesList from './NotesList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NotesSectionProps {
    notes: Note[];
    loading: boolean;
    error: string | null;
    onDeleteNote: (id: string) => void;
    onRetry?: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
    notes,
    loading,
    error,
    onDeleteNote,
    onRetry
}) => {
    return (
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-white/20">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                        📚 Your Notes
                    </CardTitle>
                    <Badge variant="secondary" className="text-sm">
                        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {error && (
                    <ErrorMessage message={error} onRetry={onRetry} />
                )}

                {loading ? (
                    <Loading message="Loading your notes..." />
                ) : (
                    <NotesList
                        notes={notes}
                        onDeleteNote={onDeleteNote}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default NotesSection;
