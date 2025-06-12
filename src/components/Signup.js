import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.webp";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://echovote-backend.onrender.com/user/signup", formData);
      toast.success(response.data.message || "OTP sent to your email. Please check you junk folder if you don't see it in your inbox.");
      setShowOTP(true);
      setEmailForOTP(formData.email);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const response = await axios.post("https://echovote-backend.onrender.com/user/verify", {
        email: emailForOTP,
        otp
      });
      toast.success(response.data.message || "Email verified! You can now log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
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
                <h2 className="card-title">Sign Up</h2>
              </div>
              {!showOTP ? (
                <form onSubmit={handleSignup}>
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
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                  <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-primary">Login</a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerify}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP sent to your email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={e => setOTP(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100" disabled={verifying}>
                    {verifying ? "Verifying..." : "Verify Email"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
