import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-20 flex items-center justify-between px-6 md:px-10 lg:px-14 bg-red-500'>
      <h1 className='text-3xl font-bold' >Redux Blog</h1>
      <nav>
        <ul className='flex justify-between w-28'>
          <li className='text-lg' ><Link to="/">Home</Link></li>
          <li className='text-lg' ><Link to="/post">Post</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header