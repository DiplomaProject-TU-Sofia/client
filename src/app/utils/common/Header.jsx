"use client";
import React from "react";
import NavigateBackButton from "./NavigateBackButton";

export default function Header({ isUser }) {
  return (
    <div className="w-full flex justify-between items-center bg-gradient-to-r from-cyan-700 to-cyan-500 px-8 py-4 rounded-b-2xl fixed left-0 right-0 top-0 z-50">
      {/* Back Button Section */}
      <div className="min-w-48">{isUser && <NavigateBackButton />}</div>

      {/* Logo / Title */}
      <div className="text-center flex-1">
        <h1 className="text-5xl font-extrabold text-white tracking-wider drop-shadow-lg font-[serif] italic">
          PR <span className="text-[#F5DEB3]">Beauty</span>
        </h1>
      </div>

      {/* Greeting Section */}
      <div className="text-right min-w-48">
        {isUser ? (
          <h2 className="text-white text-xl italic font-medium tracking-wider">
            Greetings, <span className="text-[#FFE5B4]">User</span>
          </h2>
        ) : (
          <h2 className="text-white text-xl italic font-medium tracking-wider">
            Greetings, <span className="text-[#FFE5B4]">Admin</span>
          </h2>
        )}
      </div>
    </div>
  );
}
