import React from 'react'
import { useDispatch } from 'react-redux'
import { addReactions } from '../postsSlice'


const reactionsEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
}

const ReactionButtons = ({post}) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionsEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        onClick={() => dispatch(addReactions({postId: post.id, reaction: name}))}
        className='mr-4'
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default ReactionButtons