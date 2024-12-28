import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  // Step 1: Send OTP
  const onSubmitEmail = async (data) => {
    const userEmail = data.email;
    if (!userEmail.endsWith("@buffalo.edu")) {
      setMessage("Email must end with @buffalo.edu");
      return;
    }
    setEmail(userEmail);
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/send-otp", {
        email: userEmail,
      });
      setStep(2);
      setMessage("OTP sent to your email.");
      toast.success("OTP sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP.");
      toast.error(error.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const onSubmitOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/verify-otp", { email, otp });
      setStep(3);
      setMessage("Email verified successfully!");
      toast.success("Email verified successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP.");
      toast.error(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Create User
  const onSubmitUser = async (data) => {
    setLoading(true);
    const userInfo = {
      name: data.name,
      email: email, // Use the verified email
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/user/signup",
        userInfo
      );
      if (res.data) {
        toast.success("Sign up successful!");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error: User already exists.");
      toast.error(err.response?.data?.message || "Error: User already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ height: "80vh" }}
      className="container signup-form d-flex justify-content-center align-items-center"
    >
      {loading ? (
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {step === 1 && (
            <form onSubmit={handleSubmit(onSubmitEmail)}>
              <h2 className="mb-4">Sign Up</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Buffalo Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@buffalo.edu"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send OTP
              </button>
              <p className="mt-3">
                Have account?{" "}
                <Link
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  to="/"
                >
                  Log in
                </Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmitOtp)}>
              <h2 className="mb-4">Verify OTP</h2>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmitUser)}>
              <h2 className="mb-4">Create Account</h2>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Full Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Create Account
              </button>
            </form>
          )}

          {message && <div className="mt-3 text-center">{message}</div>}
        </div>
      )}
      <Login />
    </div>
  );
}

export default Signup;
