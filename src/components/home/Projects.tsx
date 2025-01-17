import axios from 'axios';
import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  technologies: string[];
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Project[]>('http://localhost:3000/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Chargement des projets...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Projets</h2>
        {
          projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={project.imageUrl || 'https://placehold.co/600x400@3x.png'}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">Aucun projet disponible pour le moment.</div>
          )
        }
      </div>
    </section>
  );
};
