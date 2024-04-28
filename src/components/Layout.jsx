import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <main className='bg-slate-300 h-screen'>
      <Header />
      <Outlet />
    </main>
  )
}

export default Layout