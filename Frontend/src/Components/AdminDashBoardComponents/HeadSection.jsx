import React from 'react'
import avatar from '../../assets/avathar.jpg'
import { useSelector } from 'react-redux'

const HeadSection = () => {

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
    <h2 className="text-lg font-bold">Welcome Back 👋</h2>
    <div className="flex space-x-4 items-center">
        <h1 className='font-bold'>{`${userInfo.name} (${userInfo.role})`}</h1>
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
