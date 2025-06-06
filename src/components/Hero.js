import React from "react";
import logo from "../images/logo.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Hero() {
  const [authUser] = useAuth();
  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={logo}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width={700}
              height={500}
              loading="lazy"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Your Voice, Your Campus: Shape UB Together
            </h1>
            <p className="lead">
              EchoVote is dedicated to empowering University at Buffalo students
              to share their concerns and prioritize what matters most. Post
              your issues, vote on others, and help us focus on the topics that
              impact our community the most.
            </p>
            {authUser ? (
              <Link type="button" className="btn btn-success" to="/create-post">
                Create Post
              </Link>
            ) : (
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link
                  type="button"
                  to="/signup"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Sign Up
                </Link>
                <Link
                  type="button"
                  to="/login"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
