import connectDatabase from './src/config/database';  
import TeamMember from './src/models/team.model';  

// Exemple des leaders pour lier les membres de l'équipe  
const leaderId = "60b8f8d3b4d2f67ac89c1234"; // Remplacer avec les vrais ID de leader  

const teamMembers = [  
  {  
    name: "Alice Sanga",
    email: "alice.sanga@company.com",
    position: "Directrice Technique",  
    bio: "Passionnée par l'innovation technologique et le développement durable.",  
    imageUrl: "https://placehold.co/600x400@3x.png",  
    leaderId: leaderId  // Référence au leader  
  },  
  {  
    name: "Jean Dupont",  
    email: "jean.dupont@company.com",
    position: "Responsable des Événements",  
    bio: "Spécialiste en gestion d'événements avec plus de 10 ans d'expérience.",  
    imageUrl: "https://placehold.co/600x400@3x.png",  
    leaderId: leaderId  
  },  
  {  
    name: "Marie Kone", 
    email: "marie.kone@company.com",
    position: "Développeuse Full-Stack",  
    bio: "Amoureuse du code et de l'apprentissage continu dans le secteur technologique.",  
    imageUrl: "https://placehold.co/600x400@3x.png",  
    leaderId: leaderId  
  },  
  {  
    name: "Joseph Nguema",
    email: "joseph.nguema@company.com",
    position: "Community Manager",  
    bio: "Expert en communication numérique et gestion de communautés.",  
    imageUrl: "https://placehold.co/600x400@3x.png",  
    leaderId: leaderId  
  },  
  {  
    name: "Fatou Bayo",  
    email: "fatou.bayo@company.com",
    position: "Chef de Projet",  
    bio: "Professionnelle aguerrie en gestion de projets avec une approche centrée sur l'utilisateur.",  
    imageUrl: "https://placehold.co/600x400@3x.png",  
    leaderId: leaderId  
  }  
];  

const seedTeamMembers = async () => {  
  await connectDatabase();  
  try {  
    // Suppression des anciennes données  
    const deleteResult = await TeamMember.deleteMany();  
    console.log(`Anciennes données des membres de l'équipe supprimées : ${deleteResult.deletedCount} documents`);  
    
    // Insertion des nouveaux membres de l'équipe  
    for (const member of teamMembers) {  
      const newMember = new TeamMember(member);  
      await newMember.save();  
      console.log(`Membre de l'équipe ajouté : ${member.name}`);  
    }  
    console.log('Tous les membres de l\'équipe ont été ajoutés avec succès');  
    process.exit(0);  
  } catch (error) {  
    console.error('Erreur lors de l\'insertion des membres de l\'équipe :', error);  
    process.exit(1);  
  }  
};  

seedTeamMembers();