import React from "react";
import logo from "../images/logo.webp";
import ayushImg from "../images/ayushImg.png";
import aryanImg from "../images/aryanProf.png";

function About() {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center ">
        <img
          className="d-block mx-auto mb-4"
          src={logo}
          alt=""
          width={72}
          height={57}
        />
        <h1 className="display-5 fw-bold text-danger">About EchoVote</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Welcome to EchoVote, the University at Buffalo's student-powered
            platform for raising and addressing campus concerns. We believe
            every student’s voice matters, and this website provides a space to
            share your issues, vote on others' posts, and help us prioritize
            what truly impacts our community.
          </p>
        </div>
      </div>

      {/*  How it works   ************************************************* */}

      <div className="container px-4 py-5" id="featured-3">
        <h1 className="display-6 fw-bold text-dark border-bottom">
          How It Works
        </h1>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className=" d-inline-flex align-items-center justify-content-center  fs-2 mb-3">
              <i width="1em" height="1em" className="fa-solid fa-upload"></i>
            </div>
            <h3 className="fs-2 text-primary">Post an Issue</h3>
            <p>
              Share your concerns about campus life, academics, or any topic
              affecting your UB experience.
            </p>
          </div>
          <div className="feature col">
            <div className=" d-inline-flex align-items-center justify-content-center  fs-2 mb-3">
              <i className="fa-solid fa-check-to-slot"></i>
            </div>
            <h3 className="fs-2 text-primary">Vote on Issues</h3>
            <p>Show your support by liking issues that resonate with you.</p>
          </div>
          <div className="feature col">
            <div className=" d-inline-flex align-items-center justify-content-center  fs-2 mb-3">
              <i className="fa-solid fa-building-flag"></i>
            </div>
            <h3 className="fs-2 text-primary">Drive Change</h3>
            <p>
              Issues with the most votes get the highest priority, helping
              administrators focus on what matters most to the student body.
            </p>
          </div>
        </div>
      </div>

      {/* Why EchoVote  ************************************************* */}

      <div className="px-4 my-5 pb-5 text-center ">
        <h1 className="display-5 fw-bold text-dark">Why EchoVote?</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            We named our platform ‘EchoVote’ because it reflects the power of
            collective voices echoing across our campus. Through transparent
            prioritization, we aim to create meaningful changes for everyone at
            UB
          </p>
        </div>
      </div>

      {/* About ************************************************* */}

      <div className="container px-4 py-5" id="featured-3">
        <h1 className="display-6 fw-bold text-dark border-bottom">Authors</h1>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={ayushImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Ayush Srivastava</h5>
          
                <a
                  href="https://github.com/axxyush"
                  className="btn btn-primary"
                >
                  View Github
                </a>
              </div>
            </div>
          </div>
          <div className="feature col">
            <div className="card" style={{ width: "18rem" }}>
              <img src={aryanImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Aryan Mudgal</h5>
                
                <a
                  href="https://github.com/aryanmudgal-tech"
                  className="btn btn-primary"
                >
                  View Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container"></div>
    </>
  );
}

export default About;
