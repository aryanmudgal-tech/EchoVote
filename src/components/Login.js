import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../images/logo.webp";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const userInfo = { email: data.email, password: data.password };

    try {
      const res = await axios.post(
        "http://localhost:4000/user/login", // Adjust this URL for your backend
        userInfo
      );
      if (res.data) {
        toast.success("Login successful!");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => window.location.reload(), 1000); // Reload after login
      }
    } catch (err) {
      toast.error("Error: Invalid username or password");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {loading ? (
              <div
                style={{ height: "20vh" }}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <main className="form-signin p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <img
                      className="mb-4"
                      src={logo}
                      alt=""
                      width={72}
                      height={57}
                    />
                    <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control my-2"
                        id="floatingInput"
                        placeholder="name@example.com"
                        {...register("email", { required: true })}
                      />
                      <label htmlFor="floatingInput">Email address</label>
                      {errors.email && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control my-2"
                        id="floatingPassword"
                        placeholder="Password"
                        {...register("password", { required: true })}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      {errors.password && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>

                    <button
                      className="btn btn-primary w-100 py-2"
                      type="submit"
                    >
                      Log in
                    </button>
                    <p className="mt-3">
                      Not registered? <a href="/signup">Sign up</a>
                    </p>
                    <p className="mt-5 mb-3 text-body-secondary">© EchoVote</p>
                  </form>
                </main>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
