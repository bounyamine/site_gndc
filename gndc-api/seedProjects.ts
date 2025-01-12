import connectDatabase from './src/config/database';
import Project from './src/models/project.model';

const projects = [
  {
    imageUrl: "https://placehold.co/600x400@3x.png",
    title: "Site Web GNDC",
    description: "Plateforme principale",
    technologies: ["React", "Node.js"],
  },
  {
    imageUrl: "https://placehold.co/600x400@3x.png",
    title: "API GNDC",
    description: "Backend infrastructure",
    technologies: ["Express", "MongoDB"],
  },
  {
    imageUrl: "https://placehold.co/600x400@3x.png",
    title: "Mobile App",
    description: "Application mobile",
    technologies: ["React Native", "Firebase", "Flutter"],
  },
];

const seedProjects = async () => {
  await connectDatabase();
  try {
    const deleteResult = await Project.deleteMany();
    console.log(`Supprimé ${deleteResult.deletedCount} projets existants`);

    await Project.insertMany(projects);
    console.log('Projets ajoutés avec succès');
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur lors de l\'insertion des projets :', error.message);
    } else {
      console.error('Erreur inconnue lors de l\'insertion des projets :', error);
    }
    process.exit(1);
  }  
};

seedProjects();
