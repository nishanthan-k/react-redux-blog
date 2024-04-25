import React from "react";
import { useSelector } from "react-redux";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const renderPosts = posts.map((post) => {
    return (
      <div
        key={post.id}
        className="border border-slate-600 rounded-md mb-6 w-full flex flex-col items-center px-4"
      >
        <h3 className="text-lg font-medium">{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
      </div>
    );
  });

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-6">Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostsList;
