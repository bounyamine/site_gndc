import { useState } from "react";
import BaseEntity from "./BaseEntity";
import useApi from "./useApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormField from "./FormField";
import { Input } from "@/components/ui/input";

interface ILeader extends BaseEntity {  
    name: string; 
    position: string; 
    email?: string;
    leaderId: string; 
    expertise: string[];
    city?: string;
    bio?: string; 
    imageUrl?: string; 
}

const LeadersManagement = () => {
    const { data: team, loading, error, deleteItem, addOrUpdateItem } = useApi<ILeader>('team');
    const [selectedLeader, setSelectedLeader] = useState<ILeader | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = async (leaderId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce leader ?")) {
            await deleteItem(leaderId);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Leaders</h1>
                <Button onClick={() => {
                    setSelectedLeader(null);
                    setDialogOpen(true);
                }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un leader
                </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            <th className="h-12 px-4 text-left align-middle font-medium">Nom</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Rôle</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Ville</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Expertises</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {team.map((leader) => (  
                            <tr key={leader._id} className="border-b hover:bg-gray-100">  
                                <td className="p-4">{leader.name || "Nom non défini"}</td> {/* Utiliser leader.name */}  
                                <td className="p-4">{leader.email || "Email non défini"}</td> {/* S'assurer de définir cette propriété */}  
                                <td className="p-4 capitalize">{leader.position || "Poste non défini"}</td> {/* Utiliser leader.position */}  
                                <td className="p-4">{leader.city || "Ville non définie"}</td> {/* ville non présente dans les données actuelles */}  
                                <td className="p-4">{leader.expertise.length > 0 ? leader.expertise.join(', ') : 'Aucune expertise'}</td>  
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedLeader(leader);
                                                setDialogOpen(true);
                                            }}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(leader._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>  
                        ))}  
                    </tbody>
                </table>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedLeader ? "Modifier le leader" : "Ajouter un leader"}
                        </DialogTitle>
                    </DialogHeader>
                    <LeaderForm
                        leader={selectedLeader}
                        onSubmit={async (data) => {
                            await addOrUpdateItem(data, selectedLeader?._id);
                            setDialogOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Leader Form Component  
const LeaderForm = ({  
    leader,  
    onSubmit,  
}: {  
    leader?: ILeader | null;  
    onSubmit: (data: Partial<ILeader>) => Promise<void>;  
}) => {  
    const [formData, setFormData] = useState({  
        name: leader?.name || "",  
        email: leader?.email || "",  
        city: leader?.city || "",  
        expertise: leader?.expertise.join(', ') || "", // Affiche l'expertise sous forme de chaîne  
        bio: leader?.bio || "",  
        imageUrl: leader?.imageUrl || "",  
    });  

    const [errorMessage, setErrorMessage] = useState<string | null>(null);  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;  
        setFormData((prevData) => ({ ...prevData, [name]: value }));  
    };  

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        
        // Validation simple avant l'envoi  
        if (!formData.name || !formData.email || !formData.city) {  
            setErrorMessage('Tous les champs doivent être complétés.');  
            return;  
        }  

        setErrorMessage(null);  
        const expertiseArray = formData.expertise.split(',')  
            .map(item => item.trim())  
            .filter(Boolean);  

        await onSubmit({ ...formData, expertise: expertiseArray });  
    };  

    return (  
        <form onSubmit={handleSubmit} className="space-y-4">  
            {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* Afficher erreurs */}  
            
            <FormField label="Nom Complet">  
                <Input  
                    required  
                    name="name"  
                    value={formData.name}  
                    onChange={handleChange}  
                />  
            </FormField>  

            <FormField label="Email">  
                <Input  
                    type="email"  
                    required  
                    name="email"  
                    value={formData.email}  
                    onChange={handleChange}  
                />  
            </FormField>   

            <FormField label="Ville">  
                <Input  
                    required  
                    name="city"  
                    value={formData.city}  
                    onChange={handleChange}  
                />  
            </FormField>  

            <FormField label="Expertise (séparées par des virgules)">  
                <Input  
                    name="expertise"  
                    value={formData.expertise}  
                    onChange={handleChange}  
                    placeholder="Stratégie, Innovation, Gestion"  
                />  
            </FormField>  

            <Button type="submit" className="w-full" disabled={Boolean(errorMessage)}> {/* Désactiver si erreurs */}  
                {leader ? "Mettre à jour" : "Créer"}  
            </Button>  
        </form>  
    );  
};  

export default LeadersManagement;