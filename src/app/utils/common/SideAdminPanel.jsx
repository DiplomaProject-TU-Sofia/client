"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ADMIN_LIST_OPTIONS, ADMIN_PAGE_URL } from "../constants/constants";


export default function SideAdminPanel() {
  const router = useRouter();
    const pathname = usePathname()
  const [selectedSection, setSelectedSection] = useState("");

  // Detect selected section once the router is ready
  useEffect(() => {
    console.log(pathname.split('/')[2])
    setSelectedSection(pathname.split('/')[2])
  }, []); 

  const redirectTo = (optionName) => {
    const newPath = `${ADMIN_PAGE_URL}/${optionName}`;
    router.push(newPath);
    setSelectedSection(optionName); // Immediately update UI
  };

  return (
    <div className="fixed top-[4rem] left-0 h-full w-[8.3rem] bg-gradient-to-b from-cyan-700 to-cyan-500 flex flex-col gap-3 pt-4 z-40">
      {ADMIN_LIST_OPTIONS.map((optionName, index) => {
        const isSelected = selectedSection === optionName;

        return (
          <div
            key={index}
            onClick={() => redirectTo(optionName)}
            className={`flex items-center gap-3 px-5 py-4 w-full cursor-pointer transition-all duration-200
              ${isSelected
                ? "bg-white text-cyan-600 shadow-md scale-[1.02]"
                : "text-white hover:bg-white hover:text-cyan-600 hover:shadow-md hover:scale-[1.02]"
              }`}
          >
            <img
              src={`/assets/${optionName}-icon.sv`+'g'}
              alt={`${optionName} icon`}
              className="w-5 h-5"
            />
            <h1
              className={`text-lg font-serif italic tracking-wide ${
                isSelected ? "text-cyan-600" : "text-[#E0D2C3]"
              }`}
            >
              {optionName}
            </h1>
          </div>
        );
      })}
    </div>
  );
}