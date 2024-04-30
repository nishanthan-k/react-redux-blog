import React from "react";
import { useSelector } from "react-redux";
import { getPostsError, getPostsStatus, selectAllPosts } from "../postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

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
