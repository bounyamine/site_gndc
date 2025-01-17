import { MainLayout } from "@/layouts/MainLayout";
import axios from "axios";
import { Github, Users, Star, GitBranch, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface Project {
  title: string;
  description: string;
  status: "active" | "development";
  technologies: string[];
  githubUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contributors: any[];
  stars: number;
  forks: number;
  lastUpdated: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            project.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {project.status === "active" ? "Actif" : "En développement"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 text-gray-600 mb-4">
        <div className="flex items-center">
          <Users size={18} className="mr-2" />
          <span>{project.contributors.length} contributeurs</span>
        </div>
        <div className="flex items-center">
          <Star size={18} className="mr-2" />
          <span>{project.stars || 0} stars</span>
        </div>
        <div className="flex items-center">
          <GitBranch size={18} className="mr-2" />
          <span>{project.forks || 0} forks</span>
        </div>
        <div className="flex items-center">
          <Calendar size={18} className="mr-2" />
          <span>Dernière mise à jour: {project.lastUpdated}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <a className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800" href={project.githubUrl}>
          <Github size={18} className="mr-2" />
          Voir sur GitHub
        </a>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Contribuer
        </button>
      </div>
    </div>
  );
};

const ProjectFilters = ({
  filters,
  setFilters,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: (filters: any) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        <select
          className="border rounded-lg px-4 py-2"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="development">En développement</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={filters.technology}
          onChange={(e) =>
            setFilters({ ...filters, technology: e.target.value })
          }
        >
          <option value="all">Toutes les technologies</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="MongoDB">MongoDB</option>
          <option value="React Native">React Native</option>
          <option value="Flutter">Flutter</option>
          <option value="Firebase">Firebase</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="latest">Plus récent</option>
          <option value="popular">Plus populaire</option>
          <option value="active">Plus actif</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        >
          <option value="all">Toutes les dates</option>
          <option value="lastWeek">La semaine dernière</option>
          <option value="lastMonth">Le mois dernier</option>
          <option value="lastYear">L'année dernière</option>
        </select>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [projects, setProjects] = useState<Project[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filters, setFilters] = useState({
    status: "all",
    technology: "all",
    sort: "latest",
    date: "all",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets :', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchStatus =
      filters.status === "all" || project.status === filters.status;
    const matchTechnology =
      filters.technology === "all" ||
      project.technologies.includes(filters.technology);
    const matchDate =
      filters.date === "all" || project.lastUpdated >= filters.date;
    return matchStatus && matchTechnology && matchDate;
  });

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProjects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <MainLayout>
      <div className="bg-gray-50">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Projets GNDC</h1>
            <p className="text-xl text-blue-100">
              Explorez les projets innovants de notre communauté
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ProjectFilters filters={filters} setFilters={setFilters} />

          <div className="grid md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <nav className="flex space-x-2">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border rounded-lg ${
                    number === currentPage ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                  }`}
                >
                  {number}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
);
};

export default ProjectsPage;
