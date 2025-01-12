import React, { useState } from 'react';
import { Button } from '../../common';

type PostEditorProps = {
  onSubmit: (postData: PostFormData) => void;
};

type PostFormData = {
  title: string;
  content: string;
  category: string;
  tags: string;
};

export const PostEditor: React.FC<PostEditorProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Nouvel article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contenu</label>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
            rows={10}
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Aperçu
          </Button>
          <Button variant="primary" type="submit">
            Publier
          </Button>
        </div>
      </form>
    </div>
  );
};