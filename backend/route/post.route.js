import express from "express";
import Post from "../models/post.model.js"; // Ensure you have a Post model defined

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content || !tags) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPost = new Post({
      title,
      content,
      tags,
      author: req.user.id, // Assuming you have authentication middleware
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;