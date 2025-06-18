import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import './PostCard.css';

function PostCard({ post, onLikeUpdate }) {
  const [authUser] = useAuth();
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReplies();
    // eslint-disable-next-line
  }, [post.id]);

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const res = await axios.get(`https://echovote-1.onrender.com/posts/${post.id}/replies`);
      setReplies(res.data);
    } catch (error) {
      setReplies([]);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error('Please login to reply');
      return;
    }
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      await axios.post(
        `https://echovote-1.onrender.com/posts/${post.id}/replies`,
        { content: replyContent },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );
      setReplyContent('');
      fetchReplies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error posting reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (!authUser) {
      toast.error('Please login to like posts');
      return;
    }
    try {
      const response = await axios.post(
        `https://echovote-1.onrender.com/posts/${post.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );
      if (onLikeUpdate) {
        onLikeUpdate(post.id, response.data.likes, response.data.isLiked);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error liking post');
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Posted by: {post.author?.email}</h6>
        <p className="card-text">{post.content}</p>
        <div className="d-flex align-items-center mb-2">
          <button
            onClick={handleLike}
            className={`like-button ${post.isLiked ? 'liked' : ''}`}
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
          >
            <i className={`bi ${post.isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            <span className="like-count">{post.likes}</span>
          </button>
        </div>
        {/* Replies Section */}
        <div className="replies-section mt-3">
          <h6 className="mb-1">Replies</h6>
          {loadingReplies ? (
            <div className="text-muted">Loading replies...</div>
          ) : replies.length === 0 ? (
            <div className="text-muted">No replies yet.</div>
          ) : (
            <ul className="list-unstyled mb-2">
              {replies.map(reply => (
                <li key={reply.id} className="mb-1">
                  <span className="fw-bold">{reply.User?.email || 'User'}:</span> {reply.content}
                </li>
              ))}
            </ul>
          )}
          <form className="d-flex mt-2" onSubmit={handleReplySubmit}>
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              disabled={submitting}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={submitting || !replyContent.trim()}>
              {submitting ? 'Replying...' : 'Reply'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostCard; 