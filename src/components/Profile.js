import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // postId being deleted
  const [authUser] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to view your profile");
      navigate("/signup");
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get("https://echovote-1.onrender.com/posts/user", {
          headers: {
            'Authorization': `Bearer ${authUser.token}`
          }
        });
        console.log('User posts:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        toast.error("Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [authUser, navigate]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    setDeleting(postId);
    try {
      await axios.delete(`https://echovote-1.onrender.com/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      setPosts(posts.filter(post => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    } finally {
      setDeleting(null);
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
      <div className="row">
        <div className="col-md-12 mb-4">
          <h2>My Posts</h2>
          <p className="text-muted">Email: {authUser?.user?.email}</p>
        </div>
      </div>
      
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="card mb-4 shadow-sm" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">
                    {post.likes} Likes
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                  >
                    {deleting === post.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
                <small className="text-muted">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">
          You haven't created any posts yet. Start sharing your concerns!
        </div>
      )}
    </div>
  );
}

export default Profile; 