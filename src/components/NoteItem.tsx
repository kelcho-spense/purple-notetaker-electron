import React, { useState } from 'react';
import { Note } from '@/types';
import { formatDate } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Trash2, Calendar } from 'lucide-react';
import { useNotesStore } from '@/store';

interface NoteItemProps {
    note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
    const { deleteNote } = useNotesStore();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (): Promise<void> => {
        try {
            setIsDeleting(true);
            await deleteNote(note.id);
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-lg font-semibold text-foreground flex-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {note.title}
                    </CardTitle>
                    {/* delete alert */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                                aria-label={`Delete note: ${note.title}`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Note</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{note.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
