import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../users/usersSlice'
import { Link, useNavigate } from 'react-router-dom'

const PostAuthor = ({ userId }) => {
  const navigate = useNavigate()
  const users = useSelector(selectAllUsers);

  const author = users.find(user => user.id === userId)

  // return <p >by <span>{author ? author.name : "Unknown Author"}</span></p>
  return <p >by {author ? <Link to={`/user/${userId}`} className='hover:underline' >{`${author.name}`}</Link> : <span>Unknown Author</span>}</p>
}

export default PostAuthor