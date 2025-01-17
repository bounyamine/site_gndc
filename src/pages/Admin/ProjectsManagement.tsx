import React, { useState } from "react";
import { Edit, Trash2, Plus, Activity, GitBranch, Info, Layout } from "lucide-react";

// Properly import individual shadcn/ui components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useApi from "./useApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import FormField from "./FormField";
import BaseEntity from "./BaseEntity";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IProject extends BaseEntity {
    title: string;
    description: string;
    status: 'active' | 'passé' | 'pause';
    technologies: string[];
    githubUrl: string;
    startDate?: string;
    endDate?: string;
    teamMembers?: string[];
}

const ProjectsManagement = () => {
    const { data: projects, loading, error, deleteItem, addOrUpdateItem } = useApi<IProject>('projects');
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = async (projectId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
            await deleteItem(projectId);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Projets</h1>
        <Button onClick={() => {
          setSelectedProject(null);
          setDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project) => (
          <Card key={project._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{project.title}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project);
                      setDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start text-sm">
                  <Info className="h-4 w-4 mr-2 mt-1 shrink-0" />
                  <p className="text-gray-600 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center text-sm">
                  <Activity className="h-4 w-4 mr-2" />
                  <span className="capitalize">{project.status}</span>
                </div>
                <div className="flex items-start text-sm">
                  <Layout className="h-4 w-4 mr-2 mt-1 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 px-2 py-1 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.githubUrl && (
                  <div className="flex items-center text-sm">
                    <GitBranch className="h-4 w-4 mr-2" />
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Dépôt GitHub
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? "Modifier le projet" : "Créer un projet"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={selectedProject}
            onSubmit={async (data) => {
              await addOrUpdateItem(data, selectedProject?._id);
              setDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
    );
};

const ProjectForm = ({
    project,
    onSubmit,
}: {
    project?: IProject | null;
    onSubmit: (data: Partial<IProject>) => Promise<void>;
}) => {
    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        status: project?.status || "active",
        technologies: project?.technologies?.join(', ') || "",
        githubUrl: project?.githubUrl || "",
        startDate: project?.startDate || "",
        endDate: project?.endDate || "",
        teamMembers: project?.teamMembers?.join(', ') || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const technologies = formData.technologies
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        const teamMembers = formData.teamMembers
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        await onSubmit({ ...formData, technologies, teamMembers });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Titre">
                <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </FormField>

            <FormField label="Description">
                <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </FormField>

            <FormField label="Statut">
                <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as IProject['status'] })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="passé">Terminé</SelectItem>
                        <SelectItem value="pause">En pause</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <FormField label="Technologies (séparées par des virgules)">
                <Input
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, Python"
                />
            </FormField>

            <FormField label="Url du projet">
                <Input
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/exemple"
                />
            </FormField>

            <FormField label="Date de début">
                <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
            </FormField>

            <FormField label="Date de fin">
                <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
            </FormField>

            <FormField label="Membres de l'équipe (séparés par des virgules)">
                <Input
                    value={formData.teamMembers}
                    onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                    placeholder="John Doe, Jane Doe"
                />
            </FormField>

            <Button type="submit" className="w-full">
                {project ? "Mettre à jour" : "Créer"}
            </Button>
        </form>
    );
};

export default ProjectsManagement;