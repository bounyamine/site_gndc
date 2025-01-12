import { Router } from 'express';
import Project from '../models/project.model';
import { AuthRequest } from '../middleware/auth.middleware';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/contribute', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.contributors.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are already a contributor to this project' });
    }

    project.contributors.push(req.user._id);
    await project.save();

    res.status(200).json({ message: 'Successfully added as contributor', project });
  } catch (error) {
    console.error('Error adding contributor:', error);
    next(error); // Pass the error to the global error handling middleware
  }
});

export default router;
