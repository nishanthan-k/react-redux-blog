import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({post}) => {
  // console.log(post.id);
  return (
    <div
        className="border border-slate-600 rounded-md mb-6 w-full flex flex-col items-center px-4 py-2 gap-2"
      >
        <h3 className="text-lg font-medium">{post.title}</h3>
        <p className="text-wrap">{post.body.substring(0, 100)}</p>
        <p>
        <PostAuthor userId={post.id} />
        <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </div>
  )
}

export default PostsExcerpt;