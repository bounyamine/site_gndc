// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import connectDatabase from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';
import projectRoutes from './routes/project.routes';
import blogRoutes from './routes/blog.routes';
import { errorMiddleware } from './middleware/error.middleware';
import teamRoutes from './routes/team.routes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Autorise uniquement le frontend local
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
    credentials: true,
  })
);

// Connect to the database
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team', teamRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
