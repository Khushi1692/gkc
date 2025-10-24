import { z } from 'zod';

export const contactUsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

// TypeScript type for convenience
export type ContactUsInput = z.infer<typeof contactUsSchema>;
