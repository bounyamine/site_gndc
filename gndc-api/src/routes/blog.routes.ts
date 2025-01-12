// src/routes/blog.routes.ts
import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/blog.controller';
import Post from '../models/blog.model'; // Import the Post model
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware'; // Import AuthRequest
import { AuthRequest } from '../middleware/auth.middleware'; // Import AuthRequest separately

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/comments', async (req: AuthRequest, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const comment = `${req.body.content} (by ${req.user._id})`; // Store comment as a string

    post.comments = post.comments || [];
    post.comments.push(comment);
    await post.save();
    
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error('Adding comment error:', error);
    throw error; // Throw the error to be caught by the global error middleware
  }
});

export default router;