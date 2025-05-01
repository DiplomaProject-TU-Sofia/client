'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../utils/common/Header";
import DisplayCard from "../utils/common/DisplayCard";

export default function page() {

  const router = useRouter();

  useEffect(() => { 
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.replace("/not-found");
    }
  })

  const test = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="w-[100vw] flex flex-row justify-evenly items-center bg-white p-5 shadow-lg">
        <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">
          Salons
        </h1>
        <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">
          Workers
        </h1>
        <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">
          Services
        </h1>
        <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">
          Admins
        </h1>
        <h1 className="text-[#E0D2C3] text-2xl font-serif italic tracking-wide">
          {" "}
          Assets
        </h1>
      </div>
      <div className="grid grid-cols-4 w-full h-[70vh] place-items-center">
        {test.map((element, index) => (
          <DisplayCard key={index} />
        ))}
      </div>
    </div>
  );
}
