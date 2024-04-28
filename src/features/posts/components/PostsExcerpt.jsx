import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = ({ post }) => {
  return (
    <div className='bg-slate-100 border border-slate-500 rounded-xl w-5/6 max-w-3xl max-h-72 min-h-max mt-6 px-3 py-2 overflow-scroll'>
      <section className='h-3/5 overflow-hidden flex flex-col gap-2'>
        <h2 className="text-2xl font-medium">{post.title.substring(0, 40)}</h2>
        <p className="text-lg">{post.body.substring(0, 75)}</p>
      </section>
      <section className='flex flex-col gap-1'>
        <Link to={`post/${post.id}`} className='underline'>
          View Post
        </Link>
        <div className='flex justify-between flex-wrap'>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </section>
    </div>
  );
};

export default PostsExcerpt;
