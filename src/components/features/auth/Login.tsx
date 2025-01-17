import React, { useState } from 'react';
import { useAuth } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const Login: React.FC = () => {
  const { login, error, isLoading: authLoading } = useAuth();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Bienvenue 👋</h2>
      <p className="text-gray-500 text-center mb-6">Connectez-vous pour continuer</p>

      {error && (
        <Alert>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Label> Adresse e-mail</Label>
        <Input
          type="email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          required
        />
        <Label> Mot de passe</Label>
        <Input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          required
        />
        <Button type="submit" disabled={isLoading || authLoading}>
          {(isLoading || authLoading) ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Pas encore inscrit ?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Créez un compte
        </a>
      </p>
    </div>
  );
};