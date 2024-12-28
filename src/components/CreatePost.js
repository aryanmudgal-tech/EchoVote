import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function CreatePost() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [authUser] = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    const postInfo = {
      title: data.title,
      content: data.content,
      tags: data.tags,
      author: authUser.email,
      likes: 0,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/post/create-post",
        postInfo
      );
      if (res.data) {
        toast.success("Issue Posted!");
        console.log("done");
      }
    } catch (err) {
      toast.error("Error: " + err);
      console.log("not done");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <div
        style={{ height: "80vh" }}
        className="container d-flex justify-content-center align-items-center flex-column"
      >
        <h1 className="display-5 fw-bold text-danger mb-5">Create Post</h1>
        {loading ? (
          <div className="home">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form style={{ width: "80%" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                className="form-control"
                id="title"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                rows={3}
                {...register("content", { required: true })}
              />
              {errors.content && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (Optional)
              </label>
              <select className="form-select" id="tags" {...register("tags")}>
                <option value="">Select a Tag</option>
                <option value="Campus Facilities">Campus Facilities</option>
                <option value="Academics">Academics</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreatePost;
