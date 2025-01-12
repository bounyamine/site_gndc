import React from 'react';
import { PostCard } from './PostCard';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  comments: Array<{
    id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
  }>;
};

type PostListProps = {
  posts: Post[];
};

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};