import React from 'react'
import avatar from '../../assets/avathar.jpg'
const HeadSection = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center mt-10">
    <h2 className="text-lg font-bold">Welcome Back 👋</h2>
    <div className="flex space-x-4 items-center">
        <h1 className='font-bold'>Admin</h1>
         <img
          src={avatar}
          alt="Admin Avatar"
          className="h-10 w-10 rounded-full"
        />
      </div>
    
  </header>
  )
}

export default HeadSection
