import React from 'react';
import { Note } from '@/types';
import { formatDate } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar } from 'lucide-react';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
    const handleDelete = (e: React.MouseEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (window.confirm('Are you sure you want to delete this note?')) {
                // Use setTimeout to ensure the confirm dialog is fully closed
                setTimeout(() => {
                    onDelete(note.id);
                }, 0);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        }
    };

    return (
        <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-lg font-semibold text-foreground flex-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {note.title}
                    </CardTitle>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                        aria-label={`Delete note: ${note.title}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed" title={note.description}>
                    {note.description}
                </div>
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(note.createdAt)}
                    </Badge>
                    <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to expand
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NoteItem;
