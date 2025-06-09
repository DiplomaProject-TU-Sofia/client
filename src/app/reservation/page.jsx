"use client";
import React, { useState } from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Stepper from "react-stepper-horizontal";

import { APPOINTMENT_STEPS } from "@/app/utils/constants/constants";

import Header from "../utils/common/Header";
import ChangeServiceButton from "../utils/common/ChangeServiceButton.jsx";
import SelectMenu from "../utils/common/SelectMenu";
import {
  getAllServices,
  getAvailableHours,
  getWorkersBySaloonAndService,
} from "../utils/services/admin";
import { makeReservation } from "../utils/services/user";
import { makePayment } from "../utils/services/stripe-payment";

export default function page() {
  const router = useRouter();
  // const [isLoading, setLoader] = useState(true);

  const [activeStep, setActiveStep] = useState(0);

  const [workers, setWorkers] = useState();
  const [services, setServices] = useState();
  const [saloons, setSaloons] = useState();
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [availableHours, setAvailableHours] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [selectedSaloonId, setSelectedSaloonId] = useState();
  const [selectedWorkerId, setSelectedWorkerId] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [continueWithoutPayment , setContinueWithoutPayment] = useState()
  const [allWorkers, setAllWorkers] = useState([]);

  const isUser = true;
  //TODO: Add loader everywhere on the pages with restricted access

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    let service
    if(Array.isArray(services)) service = services.filter((service)=>service.id===selectedServiceId)
    makeReservation(
      selectedServiceId,
      selectedSaloonId,
      selectedWorkerId,
      selectedDate,
      selectedTimeSlot,
      continueWithoutPayment,
      service
    )
  //setContinueWithoutPayment()
  //router.push('/reservation/success')
  }, [continueWithoutPayment]);

  useEffect(() => {
    fetchData();
  }, [activeStep]);

  useEffect(() => {
    if (selectedDate != undefined) {
      getAvailableHours(
        selectedServiceId,
        selectedSaloonId,
        selectedWorkerId,
        selectedDate
      ).then((data) => {
        setAvailableHours(data);
      });
    }
  }, [selectedDate]);

  const fetchData = async () => {
    if (activeStep === 0) {
      const servicesResponse = await getAllServices();
      setServices(servicesResponse || []);
    } else if (activeStep === 1) {
      const workersResponse = await getWorkersBySaloonAndService(
        selectedServiceId
      );
      setAllWorkers(workersResponse || []);
      // Extract unique saloons from workers
      const uniqueSaloons = Array.from(
        (workersResponse ?? [])
          .flatMap((worker) => worker.saloons || [])
          .reduce((map, saloon) => {
            if (!map.has(saloon.name)) {
              map.set(saloon.name, { id: saloon.id, name: saloon.name });
            }
            return map;
          }, new Map())
          .values()
      );
      setSaloons(uniqueSaloons);
    } else if (activeStep === 2) {
      // Filter workers already stored in state
      setWorkers(
        allWorkers.filter((worker) =>
          worker.saloons?.some((saloon) => saloon.id === selectedSaloonId)
        )
      );
    }
  };

  return (
    <>
        <div className="w-[100vw] h-[100vh] flex flex-col justify-between">
          <Header isUser={isUser} />

          <div className="shadow-lg w-[40vw] h-[50vh] m-auto flex flex-col justify-between items-center">
            <Stepper steps={APPOINTMENT_STEPS} activeStep={activeStep} />

            <div className="flex flex-col gap-16 ">
              <SelectMenu
                setSelectedServiceId={setSelectedServiceId}
                setSelectedSaloonId={setSelectedSaloonId}
                setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              setContinueWithoutPayment={ setContinueWithoutPayment }
                setSelectedTimeSlot={setSelectedTimeSlot}
                availableHours={availableHours}
                setSelectedWorkerId={setSelectedWorkerId}
                selectedServiceId={selectedServiceId}
                selectedWorkerId={selectedWorkerId}
                selectedSaloonId={selectedSaloonId}
                services={services}
                saloons={saloons}
                workers={workers}
                today={today}
                activeStep={APPOINTMENT_STEPS[activeStep]}
              />
            </div>

            <hr />
          </div>

          <div className="w-[100vw] shadow-lg h-[10vh] bg-gradient-to-r from-cyan-700 to-cyan-500 flex items-center justify-between">
            {activeStep >= 1 ? (
              <div className="ml-[5vw]">
                <ChangeServiceButton
                  text={"Previous"}
                  buttonType={"previous"}
                  setActiveStep={setActiveStep}
                />
              </div>
            ) : (
              <div></div>
            )}
            {(activeStep == 0 && selectedServiceId != undefined) ||
            (activeStep == 1 && selectedSaloonId != undefined) ||
            (activeStep == 2 &&
              selectedWorkerId != undefined &&
              selectedDate != undefined &&
              selectedTimeSlot != undefined) ? (
              <div className="mr-[5vw]">
                <ChangeServiceButton
                  text={"Next"}
                  buttonType={"next"}
                  setActiveStep={setActiveStep}
                />
              </div>
            ) : null}
          </div>
        </div>
    </>
  );
}
