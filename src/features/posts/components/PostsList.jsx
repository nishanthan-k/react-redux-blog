import React from "react";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => {
    return (
      <div
        key={post.id}
        className="border border-slate-600 rounded-md mb-6 w-full flex flex-col items-center px-4 gap-2"
      >
        <h3 className="text-lg font-medium">{post.title}</h3>
        <p className="text-wrap">{post.content.substring(0, 100)}</p>
        <p>
        <PostAuthor userId={post.id} />
        <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </div>
    );
  });

  return (
    <section className="flex flex-col items-center w-3/4 lg:w-1/2">
      <h2 className="text-3xl font-bold my-6">Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostsList;
