import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../common';
import { Github } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  contributors: string[];
  status: 'active' | 'completed' | 'paused';
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{project.title}</h3>
          <div className="flex gap-2 flex-wrap">
            {project.technologies.map(tech => (
              <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          project.status === 'active' ? 'bg-green-100 text-green-800' :
          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {project.status}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{project.description}</p>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
              className="text-sm text-blue-600 hover:underline">
              Voir sur GitHub
            </a>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">{project.contributors.length} contributeurs</span>
            <Button variant="outline">Contribuer</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};