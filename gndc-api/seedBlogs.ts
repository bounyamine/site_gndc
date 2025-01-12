import connectDatabase from './src/config/database';
import Blog from './src/models/blog.model'; // Remplacez par le chemin correct

const blogs = [
  {
    title: 'Introduction à MongoDB',
    content: 'MongoDB est une base de données NoSQL orientée document...',
    author: "6782e53e0e803f289c5d8107", // Remplacez par un ObjectId valide
    category: 'Technologie',
    tags: ['MongoDB', 'Base de données', 'NoSQL'],
    comments: ['Super article !', 'Très utile, merci !'],
    publishedAt: new Date(),
  },
  {
    title: 'Comprendre les schémas Mongoose',
    content: 'Avec Mongoose, vous pouvez définir des schémas pour structurer vos données...',
    author: "6782e53e0e803f289c5d8107", // Remplacez par un ObjectId valide
    category: 'Développement',
    tags: ['Mongoose', 'Node.js', 'JavaScript'],
    comments: ['Merci pour ces explications claires.'],
    publishedAt: new Date(),
  },
  {
    title: 'Les bonnes pratiques en React',
    content: 'React est une bibliothèque JavaScript pour créer des interfaces utilisateur...',
    author: "6782e53e0e803f289c5d8107", // Remplacez par un ObjectId valide
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'Frontend'],
    comments: ['Excellent tutoriel sur React.'],
    publishedAt: new Date(),
  },
];

const seedBlogs = async () => {
  await connectDatabase();
  try {
    const deleteResult = await Blog.deleteMany();
    console.log(`Supprimé ${deleteResult.deletedCount} blogs existants`);

    await Blog.insertMany(blogs);
    console.log('Blogs ajoutés avec succès');
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur lors de l\'insertion des blogs :', error.message);
    } else {
      console.error('Erreur inconnue lors de l\'insertion des blogs :', error);
    }
    process.exit(1);
  }  
};

seedBlogs();
