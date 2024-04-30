import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../../users/usersSlice";
import { deletePost, fetchPosts, selectPostById, updatePost } from "../postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const post = useSelector(state => selectPostById(state, Number(postId)))

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.body || "");
  const [userId, setUserId] = useState(post?.userId || "");
  const [addRequestStatus, setEditRequestStatus] = useState("idle");

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.body || "");
    setUserId(post?.userId || "");
  }, [post, postId])

  const users = useSelector(selectAllUsers);


  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const enableSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const saveHandler = () => {
    if (enableSave) {
      try {
        setEditRequestStatus("pending");
        dispatch(updatePost({ postId: post.id, title, body: content, userId: Number(userId), reactions: post.reactions }));

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${post.id}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setEditRequestStatus("idle");
      }
    }
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id} >
      {user.name}
    </option>
  ))

  const deleteHandler = () => {
    if (enableSave) {
      try {
        setEditRequestStatus("pending");
        dispatch(deletePost({ postId: post.id }));

        setTitle("");
        setContent("");
        setUserId("");
        navigate('/');
      } catch (err) {
        console.error("Failed to delete the post", err);
      } finally {
        setEditRequestStatus("idle");
      }
    }
  }

  return (
    <div className="my-4 flex flex-col items-center">
      <section className=" w-4/5 md:max-w-3xl">
        <h2 className="text-3xl font-bold">Edit a Post</h2>
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
              className="resize-none px-1 min-h-32"
            />
          </fieldset>

          <button
            type="button"
            className={`w-full h-8 mt-3 ${!enableSave ? "bg-slate-100 text-slate-500" : "bg-slate-400 text-black"}`} onClick={saveHandler}
            disabled={!enableSave}
          >
            Save Post
          </button>

          <button
            type="button"
            className={`w-full h-8 mt-3 ${!enableSave ? "bg-slate-100 text-slate-500" : "bg-slate-400 text-black"}`} onClick={deleteHandler}
            disabled={!enableSave}
          >
            Delete Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditPostForm;