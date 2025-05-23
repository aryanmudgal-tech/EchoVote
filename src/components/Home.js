import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import PostCard from './PostCard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const fetchPosts = async () => {
    try {
      const headers = authUser ? {
        Authorization: `Bearer ${authUser.token}`
      } : {};

      const response = await axios.get('http://localhost:4000/posts', { headers });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (postId, newLikes, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: newLikes, isLiked } 
        : post
    ));
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Recent Posts</h2>
        {authUser && (
          <button
            className="btn btn-primary"
            onClick={() => navigate('/create-post')}
          >
            Create Post
          </button>
        )}
      </div>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLikeUpdate={handleLikeUpdate}
          />
        ))
      )}
    </div>
  );
}

export default Home;
