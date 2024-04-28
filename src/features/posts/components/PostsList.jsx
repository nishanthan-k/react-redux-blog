import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])


  let content;
  if (postsStatus === 'loading') {
    content = <p>'Loading...'</p>;
  } else if (postsStatus === 'succeeded') {
    let orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post, index) => <PostsExcerpt key={index} post={post} />);
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <section className="flex flex-col items-center">
      {content}
    </section>
  );
};

export default PostsList;
