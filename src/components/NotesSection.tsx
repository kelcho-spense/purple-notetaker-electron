import React from 'react';
import NotesList from './NotesList';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotesStore } from '@/store';

const NotesSection: React.FC = () => {
    const { notes, loading, error, loadNotes } = useNotesStore();

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
                    <ErrorMessage message={error} onRetry={loadNotes} />
                )}

                {loading ? (
                    <Loading message="Loading your notes..." />
                ) : (
                    <NotesList />
                )}
            </CardContent>
        </Card>
    );
};

export default NotesSection;
