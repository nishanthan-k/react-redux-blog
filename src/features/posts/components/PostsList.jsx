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
    // orderedPosts = orderedPosts.filter((item, index, self) => {
    //   return index === self.findIndex((t) => (
    //     t.userId === item.userId && t.id === item.id
    //   ))
    // })
    content = orderedPosts.map((post, index) => <PostsExcerpt key={index} post={post} />);
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <section className="flex flex-col items-center w-3/4 lg:w-1/2">
      <h2 className="text-3xl font-bold my-6">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
