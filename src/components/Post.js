import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser] = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://echovote-backend-12678945690.us-central1.run.app/posts/all");
        console.log('Fetched posts:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!authUser) {
      toast.error("Please login to like posts");
      return;
    }

    try {
      // Optimistically update the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );

      // Send the like request to the backend
      await axios.post(`https://echovote-backend-12678945690.us-central1.run.app/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${authUser.token}`
        }
      });
      toast.success("Post liked successfully!");
    } catch (error) {
      console.error("Error liking the post:", error);
      toast.error("Failed to like post");
      
      // Revert the optimistic update on error
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Campus Issues</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="card mb-4 shadow-sm" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleLike(post.id)}
                    disabled={!authUser}
                  >
                    <i className="bi bi-heart-fill me-1"></i>
                    {post.likes} Likes
                  </button>
                  <small className="text-muted">
                    Posted by {post.author?.email || 'Anonymous'}
                  </small>
                </div>
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">
          No posts available. Be the first to share your concern!
        </div>
      )}
    </div>
  );
}

export default Post;
