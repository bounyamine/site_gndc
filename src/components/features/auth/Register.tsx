import React, { useState } from 'react';
import { useAuth } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Tous les champs sont requis.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError((err as Error).message || 'Une erreur est survenue lors de l’inscription.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

      {error && (
        <Alert>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Label>Prénom</Label>
        <Input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
          required
        />
        <Label>Nom</Label>
        <Input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
          required
        />
        <Label>Adresse e-mail</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <Label>Mot de passe</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <Label>Confirmer le mot de passe</Label>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : "S'inscrire"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
      Vous avez déjà un compte ?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Se connecter
        </a>
      </p>
    </div>
  );
};