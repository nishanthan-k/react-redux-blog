import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../users/usersSlice'

const PostAuthor = ({userId}) => {
  const users = useSelector(selectAllUsers);

  const author = users.find(user => user.id === userId)

  return <p>by <span>{author ? author.name : "Unknown Author"}</span></p>
}

export default PostAuthor