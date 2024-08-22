import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email(),
    message: z.string().min(10, 'If your message is that short, it might not be necessary to send it ;)'),
    honeypot: z.boolean().default(false),
    terms: z.boolean().default(false).refine((value) => value === true, { message: ' ' }),
});

export type FormSchema = typeof formSchema;