'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import Header from '../common/Header';
import { ADMIN_LIST_OPTIONS, ADMIN_PAGE_URL } from '../constants/constants';

export default function AdminLayout() {
  const router = useRouter();
  
    const redirectTo = (optionName) => {
        const newPath = `${ADMIN_PAGE_URL}/${optionName}`;
        router.push(newPath);
    };
    
  return (
    <div className="flex flex-col gap-10">
    <Header />
    <div className="w-[99vw] flex flex-row justify-evenly items-center bg-white p-5 shadow-lg">
      {ADMIN_LIST_OPTIONS.map((optionName , index) => (
        <h1 key={index} onClick={()=>redirectTo(optionName)} className="text-[#E0D2C3] cursor-pointer text-2xl font-serif italic tracking-wide">
          {optionName}
        </h1>
      ))}
    </div>
  </div>
  )
}
