import React, { useEffect, useState } from "react";
import axios from "axios";

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/post/all-posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="card m-4" key={post._id}>
            <div className="card-header text-white bg-primary">
              {post.tags.map((tag, index) => (
                <span key={index} className="badge text-bg-danger m-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <b>{post.title}</b>
              </h5>
              <p className="card-text">{post.content}</p>
              {/* Like button here - Aryan, update the likes in backend and frontend */}
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
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default Post;
