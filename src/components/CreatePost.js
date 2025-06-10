import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    // Check authentication on component mount
    const userData = JSON.parse(localStorage.getItem('Users'));
    console.log('Initial user data from localStorage:', userData);
    
    if (!userData || !userData.token) {
      console.log('No user data or token found, redirecting to login');
      toast.error('Please login to create a post');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem('Users'));
      console.log('User Data from localStorage:', userData);

      if (!userData || !userData.token) {
        console.log('No user data or token found during submit');
        toast.error('Please login to create a post');
        navigate('/login');
        return;
      }

      console.log('Making request with token:', userData.token);
      console.log('Request headers:', {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
      });

      const response = await axios.post('https://echovote-backend-12678945690.us-central1.run.app/posts/create', formData, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error config:', error.config);
      toast.error(error.response?.data?.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create a New Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows="6"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
