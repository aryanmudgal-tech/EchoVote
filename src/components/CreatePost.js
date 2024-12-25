import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags] = useState(["Technology", "Health", "Education", "Entertainment"]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Tags:", tags);
    try {
      const post = { title, content, tags };
      await axios.post("/posts", post);
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    }
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTags(selectedOptions);
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Tags Dropdown */}
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <select
            multiple
            className="form-select"
            id="tags"
            value={tags}
            onChange={handleTagChange}
            required
          >
            {availableTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
