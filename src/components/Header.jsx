import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-20 flex items-center justify-between px-3 md:px-10 bg-red-500'>
      <h1 className='text-3xl font-bold' >Redux Blog</h1>
      <nav>
        <ul className='flex justify-between flex-wrap w-28'>
          <li className='text-lg' ><NavLink to="/">Home</NavLink></li>
          <li className='text-lg' ><NavLink to="/post">Post</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header