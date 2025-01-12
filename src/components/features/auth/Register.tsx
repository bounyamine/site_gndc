import React, { useState } from 'react';
import { useAuth } from '../../../contexts';
import { Alert, Button, Input } from '../../common';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Vérifications client-side
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

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
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
          required
        />
        <Input
          type="text"
          label="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
          required
        />
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <Input
          type="password"
          label="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <Input
          type="password"
          label="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Chargement...' : "S'inscrire"}
        </Button>
      </form>
    </div>
  );
};
