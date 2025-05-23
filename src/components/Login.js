import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../images/logo.webp";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authUser, updateAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (authUser?.token) {
      console.log('User already logged in, redirecting to home');
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', formData);
      const response = await axios.post('http://localhost:4000/user/login', formData);
      console.log('Login response:', response.data);

      if (response.data && response.data.user && response.data.user.token) {
        const userData = {
          token: response.data.user.token,
          user: response.data.user
        };
        console.log('Storing user data:', userData);
        updateAuthUser(userData);
        toast.success('Login successful!');
        navigate('/');
      } else {
        console.error('Invalid response format:', response.data);
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" width="72" height="57" className="mb-3" />
                <h2 className="card-title">Login</h2>
              </div>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="mt-3 text-center">
                  Not registered? <a href="/signup" className="text-primary">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
