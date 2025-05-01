'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styled from 'styled-components';

import { logOut } from '../services/auth';

const MenuButton = ({ isLoggedIn, setIsLoggedIn}) => {

  const [isVisible, setVisible] = useState(false)
 
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleLogOut = () => { 
    logOut();
    setIsLoggedIn(false);
    setVisible(false);
  }

  return (
    <>
      <StyledWrapper>
        <div className='hover:bg-[#C6B6A7] rounded-full'>
      <label className="hamburger" onClick={()=>setVisible(true)}>
        <input type="checkbox" />
        <svg viewBox="0 0 32 32">
          <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
        </div>
      </StyledWrapper>
      
      { 
        isVisible ?
          <>
            <div className="fixed z-20 h-[100vh] w-[85vw] left-[15vw] top-0 bg-black bg-opacity-50 animate-fadeIn" onClick={() => setVisible(false)}></div>
            <div className=' z-20 fixed top-0 left-0 w-[15vw] h-[100vh] bg-white animate-fadeIn'>
            <div className='p-10 flex flex-col gap-5 text-[#BEAB96] font-mono'>
                <h3 className='text-2xl cursor-pointer'>PR Beauty</h3>
                <h3 className='text-2xl cursor-pointer'>PR Beauty</h3>
                <h3 className='text-2xl cursor-pointer'>PR Beauty</h3>
                <h3 className='text-2xl cursor-pointer'>PR Beauty</h3>
                <h3 className='text-2xl cursor-pointer'>PR Beauty</h3>
                { 
                  isLoggedIn ? 
                    <h3 onClick={handleLogOut} className='text-2xl cursor-pointer'>Log Out</h3>
                    : null
                }
          </div>
    </div>
            <div className='z-30 absolute top-0 left-[15vw] hover:cursor-pointer' onClick={()=>setVisible(false)}>
              <Image src={'/assets/close.svg'} width={25} height={20} alt='logo' />
            </div>
          </>
          
          : null
      }
    </>
  );
}

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
  }
  .hamburger input {
    display: none;
  }

  .hamburger svg {
    /* The size of the SVG defines the overall size */
    height: 3em;
    /* Define the transition for transforming the SVG */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    /* Define the transition for transforming the Stroke */
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }
`;

export default MenuButton;
