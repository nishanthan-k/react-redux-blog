import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <main className='bg-slate-300 min-h-screen max-h-max pb-4'>
      <Header />
      <Outlet />
    </main>
  )
}

export default Layout