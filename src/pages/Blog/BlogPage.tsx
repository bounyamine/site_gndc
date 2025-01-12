import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  comments: string[];
  publishedAt: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Récupérer les articles au chargement
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blogs');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Gérer l'ajout de commentaire
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/blogs/${postId}/comments`, {
        content: newComment,
      });
      // Ajouter le commentaire à l'article en local
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data.comment] }
            : post
        )
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Affichage des articles avec gestion des commentaires
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog GNDC</h1>
          <p className="text-xl text-blue-100">Actualités et articles de la communauté</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <img
                    src="https://placehold.co/600x400@3x.png"
                    alt="Article"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <User size={16} className="mr-1" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.content.substring(0, 150)}...
                    </p>
                    <button
                      className="text-blue-600 font-semibold hover:underline"
                      onClick={() => alert('Lire la suite')}
                    >
                      Lire la suite
                    </button>

                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">Commentaires</h4>
                      <ul className="space-y-2 mt-2">
                        {post.comments.map((comment, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {comment}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={handleCommentChange}
                          placeholder="Ajouter un commentaire..."
                          className="border p-2 rounded-lg w-full"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Commenter
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
