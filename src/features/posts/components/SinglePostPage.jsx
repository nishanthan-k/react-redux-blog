import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from '../postsSlice'
import { useParams } from 'react-router-dom'

const SinglePostPage = () => {
  const {postId} = useParams()
  console.log(typeof postId, postId);
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  if (!post) {
    return (
      <section>
        <p>Post not found!</p>
      </section>
    )
  }
  return (
    <div
      className="border border-slate-600 rounded-md mb-6 w-full flex flex-col items-center px-4 py-2 gap-2"
    >
      <h3 className="text-lg font-medium">{post.title}</h3>
      <p className="text-wrap">{post.body}</p>
      <p>
        <PostAuthor userId={post.id} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </div>
  )
}

export default SinglePostPage