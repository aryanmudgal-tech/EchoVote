import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import PostLike from "../models/postLike.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await Post.create({
      title,
      content,
      userId,
      likes: 0
    });

    // Fetch the created post with user information
    const postWithUser = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['email']
      }]
    });

    res.status(201).json({
      message: "Post created successfully",
      post: postWithUser
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const userId = req.user?.id; // Get current user's ID if logged in
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['email']
        }
      ],
      order: [['likes', 'DESC'], ['createdAt', 'DESC']] // Sort by likes first, then by date
    });

    // If user is logged in, get their likes
    let userLikes = [];
    if (userId) {
      userLikes = await PostLike.findAll({
        where: { userId },
        attributes: ['postId']
      });
      userLikes = userLikes.map(like => like.postId);
    }

    // Add isLiked flag to each post
    const postsWithLikeStatus = posts.map(post => ({
      ...post.toJSON(),
      isLiked: userLikes.includes(post.id)
    }));

    res.status(200).json(postsWithLikeStatus);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const posts = await Post.findAll({
      where: { userId },
      include: [{
        model: User,
        as: 'author',
        attributes: ['email']
      }],
      order: [['createdAt', 'DESC']] // Sort by date, newest first
    });

    // Get user's likes
    const userLikes = await PostLike.findAll({
      where: { userId },
      attributes: ['postId']
    });
    const likedPostIds = userLikes.map(like => like.postId);

    // Add isLiked flag to each post
    const postsWithLikeStatus = posts.map(post => ({
      ...post.toJSON(),
      isLiked: likedPostIds.includes(post.id)
    }));

    res.status(200).json(postsWithLikeStatus);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already liked the post
    const existingLike = await PostLike.findOne({
      where: {
        userId,
        postId
      }
    });

    if (existingLike) {
      // Unlike the post
      await existingLike.destroy();
      await post.decrement('likes', { by: 1 });
      await post.reload();
      res.status(200).json({
        message: "Post unliked successfully",
        likes: post.likes,
        isLiked: false
      });
    } else {
      // Like the post
      await PostLike.create({ userId, postId });
      await post.increment('likes', { by: 1 });
      await post.reload();
      res.status(200).json({
        message: "Post liked successfully",
        likes: post.likes,
        isLiked: true
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
