'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import AppointmentCalendar from "../utils/common/AppointmentCalendar";
import Header from "../utils/common/Header";

export default function page() {

    const router = useRouter();
    
    useEffect(() => { 
      const role = localStorage.getItem("role");
      if (role !== "Worker") {
        router.replace("/not-found");
      }
    })
  
  
  return (
    <div className="w-full h-full items-center flex flex-col gap-9">
      <Header />
      <div className="max-w-[60vw] h-[50vh]">
        <AppointmentCalendar />
      </div>
    </div>
  );
}
