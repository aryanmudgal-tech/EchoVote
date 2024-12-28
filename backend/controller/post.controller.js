export default Post;

import Post from "../models/post.model.js";

export const create = async (req, res) => {
  try {
    const { title, content, tags, author, likes } = req.body;

    const createdPost = new Post({
      title: title,
      content: content,
      tags: tags,
      author: author,
      likes: likes,
    });

    await createdPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        likes: createdPost.likes,
        _id: createdPost._id,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
