import React from 'react';
import { useNoteForm } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NoteFormProps {
    onAddNote: (title: string, description: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
    const {
        formData,
        updateTitle,
        updateDescription,
        isValid,
        handleSubmit
    } = useNoteForm();

    return (
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-white/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    ✨ Create New Note
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onAddNote)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="noteTitle" className="text-sm font-medium">
                            Note Title
                        </Label>
                        <Input
                            type="text"
                            id="noteTitle"
                            placeholder="Enter note title..."
                            value={formData.title}
                            onChange={(e) => {
                                console.log('Title input changed:', e.target.value);
                                updateTitle(e.target.value);
                            }}
                            onFocus={() => console.log('Title input focused')}
                            onBlur={() => console.log('Title input blurred')}
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="noteDesc" className="text-sm font-medium">
                            Description
                        </Label>
                        <Textarea
                            id="noteDesc"
                            placeholder="Enter note description..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => {
                                console.log('Description input changed:', e.target.value);
                                updateDescription(e.target.value);
                            }}
                            onFocus={() => console.log('Description input focused')}
                            onBlur={() => console.log('Description input blurred')}
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValid}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        ✨ Add Note
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NoteForm;
