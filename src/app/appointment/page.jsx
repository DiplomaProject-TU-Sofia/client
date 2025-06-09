"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AppointmentCalendar from "../utils/common/AppointmentCalendar";
import Header from "../utils/common/Header";
import Loader from "../utils/common/Loader";

export default function page() {
  const [isLoading, setLoader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Worker") {
      router.replace("/not-found");
    } else {
      setLoader(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-col gap-9">
          <Header />
          <div className="max-w-[60vw] h-[50vh] mt-20">
            <AppointmentCalendar />
          </div>
        </div>
      )}
    </>
  );
}
