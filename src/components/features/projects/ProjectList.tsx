import React from 'react';
import { ProjectCard } from './ProjectCard';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  contributors: string[];
  status: 'active' | 'completed' | 'paused';
}

export const ProjectList: React.FC<{
  projects: Project[];
  className?: string;
}> = ({ projects, className = '' }) => {
  return (
    <div className={`grid gap-6 ${className}`}>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">Aucun projet disponible</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};