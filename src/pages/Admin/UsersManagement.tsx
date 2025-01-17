import { useState } from "react";
import useApi from "./useApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Plus, Shield, Trash2, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormField from "./FormField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BaseEntity from "./BaseEntity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IUser extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'member' | 'manager';
    expertise: string[];
    city: string;
}

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
          Nouvel utilisateur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <Card key={user._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{user.firstName}</span>
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="capitalize">{user.firstName}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Modifier l'utilisateur" : "Créer un utilisateur"}
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

export default UsersManagement;