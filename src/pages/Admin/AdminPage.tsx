import React, { useState, useEffect } from "react";
import { Users, Calendar, Settings, Edit, Trash2, Plus, Tag, Activity, User } from "lucide-react";

// Properly import individual shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BaseEntity {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface IUser extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'member' | 'manager';
    expertise: string[];
    city: string;
}

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

interface IEvent extends BaseEntity {
    title: string;
    description: string;
    type: 'hackathon' | 'formation' | 'meetup';
    date: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    capacity: number;
    registeredUsers?: string[];
}

interface IProject extends BaseEntity {
    title: string;
    description: string;
    status: 'active' | 'completed' | 'paused';
    technologies: string[];
    startDate?: string;
    endDate?: string;
    teamMembers?: string[];
}

const useApi = <T,>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(`Error loading ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            const response = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setData(prevData => prevData.filter(item => (item as BaseEntity)._id !== id));
            return true;
        } catch (err) {
            setError(`Error deleting ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return false;
        }
    };

    const addOrUpdateItem = async (item: Partial<T>, id?: string) => {
        try {
            const url = id ? `/api/${endpoint}/${id}` : `/api/${endpoint}`;
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            await fetchData();
            return true;
        } catch (err) {
            setError(`Error saving ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return false;
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint, fetchData]);

    return { data, loading, error, fetchData, deleteItem, addOrUpdateItem };
};

// Loading and Error components
const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
);

const ErrorAlert = ({ message }: { message: string }) => (
    <Alert variant="destructive">
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

// Form Components
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        {children}
    </div>
);

// Sidebar Component
const Sidebar = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
    const menuItems = [
        { name: "Utilisateurs", icon: <Users className="h-5 w-5" />, key: "users" },
        { name: "Leaders", icon: <User className="h-5 w-5" />, key: "leaders" },
        { name: "Événements", icon: <Calendar className="h-5 w-5" />, key: "events" },
        { name: "Projets", icon: <Settings className="h-5 w-5" />, key: "projects" },
    ];

    return (
        <div className="bg-blue-900 text-white w-64 min-h-screen py-6">
            <h2 className="text-2xl font-bold px-6 mb-8">Admin GNDC</h2>
            <nav>
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        className={`flex items-center px-6 py-3 w-full text-left transition-colors
                            hover:bg-blue-800 ${currentPage === item.key ? "bg-blue-800" : ""}`}
                        onClick={() => setCurrentPage(item.key)}
                    >
                        {item.icon}
                        <span className="ml-4">{item.name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

// User Management Component
const UsersManagement = () => {
    const { data: users, loading, error, deleteItem, addOrUpdateItem } = useApi<IUser>('users');
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = async (userId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            await deleteItem(userId);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
                <Button onClick={() => {
                    setSelectedUser(null);
                    setDialogOpen(true);
                }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un utilisateur
                </Button>
            </div>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            <th className="h-12 px-4 text-left align-middle font-medium">Nom</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Rôle</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Ville</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="p-4">{`${user.firstName} ${user.lastName}`}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td className="p-4">{user.city}</td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setDialogOpen(true);
                                            }}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(user._id)}
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
                            {selectedUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
                        </DialogTitle>
                    </DialogHeader>
                    <UserForm
                        user={selectedUser}
                        onSubmit={async (data) => {
                            await addOrUpdateItem(data, selectedUser?._id);
                            setDialogOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

// User Form Component
const UserForm = ({
    user,
    onSubmit,
}: {
    user?: IUser | null;
    onSubmit: (data: Partial<IUser>) => Promise<void>;
}) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        role: user?.role || "member",
        city: user?.city || "",
        expertise: user?.expertise?.join(', ') || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const expertise = formData.expertise
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        await onSubmit({ ...formData, expertise });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Prénom">
                <Input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
            </FormField>

            <FormField label="Nom">
                <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
            </FormField>

            <FormField label="Email">
                <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </FormField>

            <FormField label="Rôle">
                <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value as IUser['role'] })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="member">Membre</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <FormField label="Ville">
                <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
            </FormField>

            <FormField label="Expertise (séparées par des virgules)">
                <Input
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="React, Node.js, Python"
                />
            </FormField>

            <Button type="submit" className="w-full">
                {user ? "Mettre à jour" : "Créer"}
            </Button>
        </form>
    );
};

// Leaders Management Component  
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

// Events Management Component
const EventsManagement = () => {
    const { data: events, loading, error, deleteItem, addOrUpdateItem } = useApi<IEvent>('events');
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = async (eventId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            await deleteItem(eventId);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Événements</h1>
                <Button onClick={() => {
                    setSelectedEvent(null);
                    setDialogOpen(true);
                }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvel événement
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <Card key={event._id}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <span>{event.title}</span>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(event._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm">
                                    <Tag className="h-4 w-4 mr-2" />
                                    <span className="capitalize">{event.type}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Activity className="h-4 w-4 mr-2" />
                                    <span className="capitalize">{event.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedEvent ? "Modifier l'événement" : "Créer un événement"}
                        </DialogTitle>
                    </DialogHeader>
                    <EventForm
                        event={selectedEvent}
                        onSubmit={async (data) => {
                            await addOrUpdateItem(data, selectedEvent?._id);
                            setDialogOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Event Form Component
const EventForm = ({
    event,
    onSubmit,
}: {
    event?: IEvent | null;
    onSubmit: (data: Partial<IEvent>) => Promise<void>;
}) => {
    const [formData, setFormData] = useState({
        title: event?.title || "",
        description: event?.description || "",
        type: event?.type || "meetup",
        date: event?.date ? new Date(event.date).toISOString().split('T')[0] : "",
        location: event?.location || "",
        status: event?.status || "upcoming",
        capacity: event?.capacity || 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
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

            <FormField label="Type">
                <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as IEvent['type'] })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="formation">Formation</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <FormField label="Date">
                <Input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </FormField>

            <FormField label="Lieu">
                <Input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
            </FormField>

            <FormField label="Capacité">
                <Input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                />
            </FormField>

            <FormField label="Statut">
                <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as IEvent['status'] })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="upcoming">À venir</SelectItem>
                        <SelectItem value="ongoing">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <Button type="submit" className="w-full">
                {event ? "Mettre à jour" : "Créer"}
            </Button>
        </form>
    );
};

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

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            <th className="h-12 px-4 text-left align-middle font-medium">Titre</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Statut</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Technologies</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id} className="border-b">
                                <td className="p-4">{project.title}</td>
                                <td className="p-4">{project.description}</td>
                                <td className="p-4 capitalize">{project.status}</td>
                                <td className="p-4">{project.technologies.join(', ')}</td>
                                <td className="p-4">
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
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="paused">En pause</SelectItem>
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

// Main Admin Page
const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState("users");

    return (
        <div className="flex min-h-screen">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 bg-gray-50">
                {currentPage === "users" && <UsersManagement />}
                {currentPage === "leaders" && <LeadersManagement />}
                {currentPage === "events" && <EventsManagement />}
                {currentPage === "projects" && <ProjectsManagement />}
            </main>
        </div>
    );
};

export default AdminPage;