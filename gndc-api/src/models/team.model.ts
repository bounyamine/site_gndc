import mongoose, { Schema, Document } from 'mongoose';  

// Interface pour un membre d'équipe  
export interface ITeamMember extends Document {  
    name: string;                // Nom du membre
    email: string;               // Adresse e-mail du membre
    position: string;            // Poste ou rôle du membre  
    bio: string;                 // Biographie du membre  
    imageUrl?: string;           // URL de l'image du membre (optionnel)  
    leaderId: mongoose.Types.ObjectId; // Référence au leader (ILeader)  
    expertise?: string[];        // Domaines d'expertise du membre (optionnel)  
    createdAt: Date;             // Date de création  
    updatedAt: Date;             // Date de mise à jour  
}  

// Schéma pour un membre d'équipe  
const TeamMemberSchema: Schema = new Schema({  
    name: {  
        type: String,  
        required: true,  
        trim: true  
    }, 
    email: {  
        type: String,  
        required: true,  
        trim: true  
    },  
    position: {  
        type: String,  
        required: true  
    },  
    bio: {  
        type: String,  
        required: true  
    },  
    imageUrl: {  
        type: String,  
        default: 'https://placehold.co/600x400@3x.png' // Image par défaut  
    },  
    leaderId: {  
        type: Schema.Types.ObjectId,  
        required: true,  
        ref: 'Leader' // Référence au modèle ILeader  
    },  
    expertise: {  
        type: [String],  
        default: [] // Tableau d'expertises (optionnel)  
    }  
}, {  
    timestamps: true // Ajoute automatiquement createdAt et updatedAt  
});  

// Index pour améliorer les performances des requêtes  
TeamMemberSchema.index({ name: 1 });  

// Export du modèle  
export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);