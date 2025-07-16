import { useState } from 'react';
import { NoteFormData } from '../types';
import { validateNoteForm } from '../utils';

interface UseNoteFormReturn {
    formData: NoteFormData;
    updateTitle: (title: string) => void;
    updateDescription: (description: string) => void;
    resetForm: () => void;
    isValid: boolean;
    handleSubmit: (onSubmit: (title: string, description: string) => void) => (e: React.FormEvent) => void;
}

/**
 * Custom hook for managing note form state and validation
 * @returns {UseNoteFormReturn} Form state and handlers
 */
export const useNoteForm = (): UseNoteFormReturn => {
    const [formData, setFormData] = useState<NoteFormData>({
        title: '',
        description: ''
    });

    const updateTitle = (title: string): void => {
        setFormData(prev => ({ ...prev, title }));
    };

    const updateDescription = (description: string): void => {
        setFormData(prev => ({ ...prev, description }));
    };

    const resetForm = (): void => {
        setFormData({ title: '', description: '' });
    };

    const isValid = validateNoteForm(formData.title, formData.description);

    const handleSubmit = (onSubmit: (title: string, description: string) => void) =>
        (e: React.FormEvent): void => {
            e.preventDefault();

            if (!isValid) {
                alert('Please fill in both title and description!');
                return;
            }

            onSubmit(formData.title, formData.description);
            resetForm();
        };

    return {
        formData,
        updateTitle,
        updateDescription,
        resetForm,
        isValid,
        handleSubmit
    };
};
