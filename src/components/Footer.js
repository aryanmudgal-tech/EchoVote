import React from "react";

function Footer() {
  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            © 2024 EchoVote, Inc
          </p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg className="bi me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
        </footer>
      </div>
    </>
  );
}

export default Footer;
