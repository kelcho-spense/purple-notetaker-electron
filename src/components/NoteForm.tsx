import React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { noteFormSchema, type NoteFormValues } from '@/lib/form-config';
import { useNotesStore } from '@/store';

const NoteForm: React.FC = () => {
    const { addNote } = useNotesStore();

    const form = useForm({
        defaultValues: {
            title: '',
            description: ''
        } as NoteFormValues,
        validators: {
            onChange: noteFormSchema
        },
        onSubmit: async ({ value }) => {
            await addNote(value.title, value.description);
            // Reset form after successful submission
            form.reset();
        }
    });

    return (
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-white/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    ✨ Create New Note
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="title"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="noteTitle" className="text-sm font-medium">
                                    Note Title
                                </Label>
                                <Input
                                    type="text"
                                    id="noteTitle"
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter note title..."
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <span className="text-sm text-red-500">
                                        {field.state.meta.errors[0]?.message || 'Invalid input'}
                                    </span>
                                )}
                            </div>
                        )}
                    />

                    <form.Field
                        name="description"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="noteDesc" className="text-sm font-medium">
                                    Description
                                </Label>
                                <Textarea
                                    id="noteDesc"
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter note description..."
                                    rows={4}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 resize-none"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <span className="text-sm text-red-500">
                                        {field.state.meta.errors[0]?.message || 'Invalid input'}
                                    </span>
                                )}
                            </div>
                        )}
                    />

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? '⏳ Adding Note...' : '✨ Add Note'}
                            </Button>
                        )}
                    />
                </form>
            </CardContent>
        </Card>
    );
};

export default NoteForm;
