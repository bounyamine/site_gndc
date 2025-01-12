import React, { useState } from 'react';
import { useAuth } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '../../common'; // Ajoutez un composant Alert pour afficher les erreurs ou les messages.

export const Login: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Bienvenue 👋</h2>
      <p className="text-gray-500 text-center mb-6">Connectez-vous pour continuer</p>

      {/* Affichage des erreurs */}
      {error && (
        <Alert type="error" onClose={clearError}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Adresse email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <Input
          type="password"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      {/* Lien d'inscription */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Pas encore inscrit ?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Créez un compte
        </a>
      </p>
    </div>
  );
};
