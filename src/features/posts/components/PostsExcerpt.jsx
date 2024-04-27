import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
  return (
    <div
      className="border border-slate-600 rounded-md mb-6 w-5/6 md:max-w-3xl flex flex-col  px-4 py-2 h-64 max-h-72"
    >
      <div className='h-44 overflow-hidden flex flex-col gap-2'>
        <h3 className="text-2xl font-medium">{post.title.substring(0, 40)}</h3>
        <p className="text-lg">{post.body.substring(0, 75)}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <Link to='post/1'>
          View Post
        </Link>
        <div className='flex justify-between flex-wrap'>
          <PostAuthor userId={post.id} />
          <TimeAgo timestamp={post.date} />
        </div>

        <ReactionButtons post={post} />
      </div>
    </div>
  )
}

export default PostsExcerpt;