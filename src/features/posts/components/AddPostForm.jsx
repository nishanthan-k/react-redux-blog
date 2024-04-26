import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../postsSlice";
import { selectAllUsers } from "../../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);


  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const saveHandler = () => {
    dispatch(addPost(title, content, userId));

    setTitle("");
    setContent("");
    setUserId("");
  }

  const enableSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id} >
      {user.name}
    </option>
  ))

  return (
    <section className="my-4 flex flex-col items-center w-3/4 lg:w-1/2">
      <h2 className="text-3xl font-bold">Add a New Post</h2>
      <form className="w-full ">
        <fieldset className="flex flex-col my-3 gap-2">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="px-1 h-8"
          />
        </fieldset>
        <fieldset className="flex flex-col my-3 gap-2 ">
          <label htmlFor="postTitle">Author:</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChanged} className="px-1 h-8" >
            <option value=""></option>
            {usersOptions}
          </select>

        </fieldset>
        <fieldset className="flex flex-col my-3 gap-2">
          <label htmlFor="postContent">Post Content:</label>
          <textarea
            type="text"
            name="postContent"
            id="postContent"
            value={content}
            onChange={onContentChanged}
            className="px-1 min-h-32"
          />
        </fieldset>

        <button
          type="button"
          className={`w-full h-8 mt-3 ${!enableSave ? "bg-slate-100 text-slate-500" : "bg-slate-400 text-black"}`} onClick={saveHandler}
          disabled={!enableSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
