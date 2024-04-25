import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "../../features/posts/postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleHandler = (e) => setTitle(e.target.value);
  const contentHandler = (e) => setContent(e.target.value);

  const saveHandler = () => {
    if (title && content) {
      const post = {
        id: nanoid(),
        title: title,
        content: content
      }
      dispatch(addPost(post));

      setTitle("");
      setContent("");
    }
  }

  return (
    <section className="my-4 flex flex-col items-center w-3/4 lg:w-1/2">
      <h2 className="text-3xl font-bold">Add a New Post</h2>
      <form className="w-full ">
        <fieldset className="flex flex-col my-3">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            value={title}
            onChange={titleHandler}
            className="px-1 h-8"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="postContent">Post Content:</label>
          <textarea
            type="text"
            name="postContent"
            id="postContent"
            value={content}
            onChange={contentHandler}
            className="px-1 min-h-32"
          />
        </fieldset>

        <button 
          type="button" 
          className="w-full bg-slate-400 h-8 mt-6" onClick={saveHandler}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
