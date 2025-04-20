"use client";
import React, { useState } from "react";

import Stepper from "react-stepper-horizontal";

import { APPOINTMENT_STEPS } from "@/app/utils/constants/constants";

import Header from "../common/Header";
import NextServiceButton from "../common/NextServiceButton.jsx";
import SelectMenu from "../common/SelectMenu";

export default function page() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-between items-center">
      <Header />

      <div className="shadow-lg w-[40vw] h-[60vh] flex flex-col justify-between items-center">
        <Stepper steps={APPOINTMENT_STEPS} activeStep={activeStep} />

        <div className="flex flex-col gap-16 ">
          <SelectMenu activeStep={APPOINTMENT_STEPS[activeStep]}/>
        </div>

        <hr />
      </div>

      <div className="w-[100vw] shadow-lg h-[10vh] bg-[#E0D2C3] flex items-center justify-end">
        <div className="mr-[5vw]">
          <NextServiceButton setActiveStep={setActiveStep } />
        </div>
      </div>
    </div>
  );
}
