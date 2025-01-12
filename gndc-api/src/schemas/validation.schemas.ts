// // src/schemas/validation.schemas.ts
// import { z } from 'zod';

// export const userSchema = z.object({
//   firstName: z.string().min(2, 'First name must be at least 2 characters'),
//   lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   expertise: z.array(z.string()).optional(),
//   city: z.string().optional()
// });

// export const eventSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   description: z.string().min(10, 'Description must be at least 10 characters'),
//   type: z.enum(['hackathon', 'formation', 'meetup']),
//   date: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date format'),
//   location: z.string().min(3, 'Location must be at least 3 characters'),
//   maxParticipants: z.number().min(0).optional()
// });

// export const projectSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   description: z.string().min(10, 'Description must be at least 10 characters'),
//   technologies: z.array(z.string()).min(1, 'At least one technology required'),
//   githubUrl: z.string().url('Invalid GitHub URL').optional(),
//   status: z.enum(['active', 'completed', 'paused'])
// });

// export const postSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   content: z.string().min(50, 'Content must be at least 50 characters'),
//   category: z.string().min(2, 'Category must be at least 2 characters'),
//   tags: z.array(z.string()).optional()
// });

