import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

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

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true); // Start loading
    const userInfo = {
      name: data.name,
      email: data.email,
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
      toast.error("Error: User already exists");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div
        style={{ height: "80vh" }}
        className="container signup-form d-flex justify-content-center align-items-center"
      >
        {loading ? (
          <div className="home">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-text text-danger">
                Please remember your password. Due to security reasons you WON'T
                be able to see or change it again!
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <p className="mt-3">
              Already have an account? <Link to="/">Log in</Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
}

export default Signup;
