// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import Project from '../models/project.model';

const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Fetching projects failed', error });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Fetching project failed', error });
  }
};

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Creating project failed', error });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project updated', project });
  } catch (error) {
    res.status(500).json({ message: 'Updating project failed', error });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting project failed', error });
  }
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
