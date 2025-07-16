import { z } from 'zod';

// Define validation schema
const noteFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().min(1, 'Description is required').max(5000, 'Description must be less than 5000 characters')
});

export { noteFormSchema };
export type NoteFormValues = z.infer<typeof noteFormSchema>;
