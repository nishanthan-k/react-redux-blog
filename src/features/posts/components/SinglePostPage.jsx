import React, { useDebugValue, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectPostById } from '../postsSlice'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (!post) {
    return (
      <section>
        <p>Post not found!</p>
      </section>
    )
  }
  return (
    <section className='flex flex-col items-center'>
      <div className='bg-slate-100 border border-slate-500 rounded-xl w-5/6 max-w-3xl mt-6 px-3 py-2 overflow-scroll'>
        <section className='overflow-hidden flex flex-col gap-2'>
          <h2 className="text-2xl font-medium">{post.title}</h2>
          <p className="text-lg">{post.body}</p>
        </section>
        <section className='flex flex-col gap-1 mt-4'>
          <Link to={`/post/edit/${post.id}`} className='underline'>
            Edit Post
          </Link>
          <div className='flex justify-between flex-wrap'>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </div>
          <ReactionButtons post={post} />
        </section>
      </div>
    </section>
  )
}

export default SinglePostPage