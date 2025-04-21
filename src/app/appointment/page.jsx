import React from "react";
import AppointmentCalendar from "../utils/common/AppointmentCalendar";
import Header from "../utils/common/Header";

export default function Page() {
  return (
    <div className="w-full h-full items-center flex flex-col gap-9">
      <Header />
      <div className="max-w-[60vw] h-[50vh]">
        <AppointmentCalendar />
      </div>
    </div>
  );
}
