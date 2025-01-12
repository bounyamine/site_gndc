import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { Post } from './PostList';

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full" 
          />
          <div>
            <h4 className="font-medium text-gray-900">{post.author.name}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {post.publishedAt}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.category}</span>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.comments.length} commentaires
          </div>
        </div>
      </div>
    </article>
  );
};