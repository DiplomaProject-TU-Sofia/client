'use client'
import React from 'react'
import NavigateBackButton from './NavigateBackButton'



export default function Header({ isUser}) {
  return (
    <div className='w-[100vw] flex flex-row justify-between items-center bg-white p-5 shadow-lg'>
      <div className='min-w-48'>
      {
        isUser ? 
            <NavigateBackButton/>
            : null
          }
          </div>

          <div >
            <h1 className='text-[#E0D2C3] text-5xl shadow-textRed'>PR Beauty</h1>
          </div>

          <div>
            <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">Greetings, User</h1>
          </div>
    </div>
  )
}
