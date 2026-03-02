import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayou = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar /> 
     <main className='flex-grow'>
      <Outlet />
     </main>
     <Footer />
    </div>
  )
}

export default HomeLayou
