import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Plus, Edit, Trash2, Calendar, Tag, Activity } from "lucide-react";
import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import FormField from "./FormField";
import LoadingSpinner from "./LoadingSpinner";
import useApi from "./useApi";
import BaseEntity from "./BaseEntity";

interface IEvent extends BaseEntity {
    title: string;
    description: string;
    type: 'hackathon' | 'formation' | 'meetup';
    date: string;
    location: string;
    status: 'à venir' | 'en cours' | 'passé';
    capacity: number;
    registeredUsers?: string[];
}

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
                        <SelectItem value="passé">Terminé</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>

            <Button type="submit" className="w-full">
                {event ? "Mettre à jour" : "Créer"}
            </Button>
        </form>
    );
};

export default EventsManagement;