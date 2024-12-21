import React from "react";

function Post() {
  return (
    <>
      <div className="container">
        <div className="card m-4">
          <div className="card-header text-white bg-primary">
            <span className="badge text-bg-danger m-2">Campus Facilities</span>
            <span className="badge text-bg-danger m-2">Academics</span>
            <span className="badge text-bg-danger m-2">Housing</span>
            <span className="badge text-bg-danger m-2">Transportation</span>
            <span className="badge text-bg-danger m-2">Dining</span>
            <span className="badge text-bg-danger m-2">Technology</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <b>Need More Seating in the Library During Exam Season</b>
            </h5>
            <p className="card-text">
              During finals week, the library is always packed, and it’s really
              hard to find a quiet spot to study. Many students have to sit on
              the floor or leave because there’s not enough seating. Can we add
              more chairs and tables, or maybe open up additional study spaces
              around campus during exam season? This would really help students
              focus and perform better on their exams.
            </p>
            <>
              <div className="like-button">
                <input className="on" id="heart" type="checkbox" />
                <label className="like" htmlFor="heart">
                  <svg
                    className="like-icon"
                    fillRule="nonzero"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                  <span className="like-text">Likes</span>
                </label>
                <span className="like-count one">0</span>
                <span className="like-count two">1</span>
              </div>
            </>
          </div>
        </div>

        <div className="card m-4">
          <div className="card-header text-white bg-primary">
            <span className="badge text-bg-danger m-2">Campus Facilities</span>
            <span className="badge text-bg-danger m-2">Academics</span>
            <span className="badge text-bg-danger m-2">Housing</span>
            <span className="badge text-bg-danger m-2">Transportation</span>
            <span className="badge text-bg-danger m-2">Dining</span>
            <span className="badge text-bg-danger m-2">Technology</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <b>Shuttle Bus Delays Are Affecting Class Attendance</b>
            </h5>
            <p className="card-text">
              The campus shuttle buses are often delayed, especially during peak
              hours in the morning. Many students, including myself, have been
              late to class because of this issue. It would be great if we could
              have more buses during busy times or at least real-time updates
              about delays through an app or website. This would help us plan
              better and reduce the stress of getting to class on time.
            </p>
            <>
              <div className="like-button">
                <input className="on" id="heart" type="checkbox" />
                <label className="like" htmlFor="heart">
                  <svg
                    className="like-icon"
                    fillRule="nonzero"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                  <span className="like-text">Likes</span>
                </label>
                <span className="like-count one">0</span>
                <span className="like-count two">1</span>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
