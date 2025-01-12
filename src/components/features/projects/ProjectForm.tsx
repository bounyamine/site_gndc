import React, { useState } from 'react';
import { Button, Input } from '../../common';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  contributors: string[];
  status: 'active' | 'completed' | 'paused';
}

export const ProjectForm: React.FC<{
  onSubmit: (projectData: Omit<Project, '_id'>) => void;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    githubUrl: '',
    contributors: [] as string[],
    status: 'active' as Project['status']
  });

  const handleTechChange = (value: string) => {
    const techs = value.split(',').map(t => t.trim());
    setFormData(prev => ({ ...prev, technologies: techs }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} className="space-y-6 w-full max-w-lg">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Titre du projet"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows={4}
        />

        <Input
          type="text"
          placeholder="Technologies (séparées par des virgules)"
          value={formData.technologies.join(', ')}
          onChange={e => handleTechChange(e.target.value)}
          required
        />

        <Input
          type="url"
          placeholder="URL GitHub"
          value={formData.githubUrl}
          onChange={e => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
          required
        />

        <select
          className="w-full p-2 border rounded-md"
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Project['status'] }))}
          required
        >
          <option value="active">Actif</option>
          <option value="completed">Terminé</option>
          <option value="paused">En pause</option>
        </select>

        <Button type="submit">Créer le projet</Button>
      </div>
    </form>
  );
};