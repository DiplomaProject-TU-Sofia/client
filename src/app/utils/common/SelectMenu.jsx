"use client";
import { useEffect, useState } from "react";
import { makePayment } from "../services/stripe-payment";

export default function SelectMenu({
  saloons,
  services,
  today,
  workers,
  setContinueWithoutPayment,
  activeStep,
  setSelectedDate,
  setSelectedTimeSlot,
  availableHours,
  selectedDate,
  setSelectedServiceId,
  setSelectedSaloonId,
  setSelectedWorkerId,
  selectedSaloonId,
  selectedServiceId,
  selectedWorkerId,
}) {
  const [selectedService, setSelectedService] = useState();
  useEffect(() => {
    if (Array.isArray(services) && services.length != 0)
      setSelectedService(
        services.filter((service) => service.id === selectedServiceId)
      );
  }, [selectedServiceId]);
  return (
    <>
      {activeStep.title != "Payment" ? (
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (activeStep.title === "Service") {
              setSelectedServiceId(value);
            } else if (activeStep.title === "Saloon details") {
              setSelectedSaloonId(value);
            } else if (activeStep.title === "Hairdresser") {
              setSelectedWorkerId(value);
            }
          }}
          className="w-[20vw] border rounded-2xl p-4"
          value={
            activeStep.title === "Service"
              ? selectedServiceId || ""
              : activeStep.title === "Saloon details"
              ? selectedSaloonId || ""
              : selectedWorkerId || ""
          }
        >
          <option value="" disabled>
            {activeStep.title === "Service"
              ? "Select a service"
              : activeStep.title === "Saloon details"
              ? "Select a salon"
              : "Select a hairdresser"}
          </option>

          {activeStep.title === "Service" &&
            Array.isArray(services) &&
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}

          {activeStep.title === "Saloon details" &&
            Array.isArray(saloons) &&
            saloons.map((saloon) => (
              <option key={saloon.id} value={saloon.id}>
                {saloon.name}
              </option>
            ))}

          {activeStep.title === "Hairdresser" &&
            Array.isArray(workers) &&
            workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.firstName} {worker.lastName}
              </option>
            ))}
        </select>
      ) : null}

      <div className="flex flex-col gap-5">
        {selectedWorkerId !== undefined &&
          activeStep.title === "Hairdresser" && (
            <input
              onChange={(e) => setSelectedDate(e.target.value)}
              type="date"
              min={today}
              className="w-[20vw] border rounded-2xl p-4"
            />
          )}
        {selectedDate !== undefined &&
        activeStep.title === "Hairdresser" &&
        activeStep.title != "Payment" ? (
          <select
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="w-[20vw] border rounded-2xl p-4"
            defaultValue=""
          >
            <option value="" disabled>
              Select time slot
            </option>
            {activeStep.title === "Hairdresser" &&
              Array.isArray(availableHours) &&
              availableHours.length !== 0 &&
              Array.isArray(availableHours[0].availableStartTimes) &&
              availableHours[0].availableStartTimes
                // .filter((timeSlot) => {
                //   const now = new Date();
                //   const [hour, minute] = timeSlot.split(":").map(Number);
                //   const slotTime = new Date();
                //   slotTime.setHours(hour, minute, 0, 0);
                //   return slotTime > now;
                // })
                .map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>
                    {timeSlot.slice(0, 5)}
                  </option>
                ))}
              { 
                console.log(availableHours)
              }
          </select>
        ) : null}

        {activeStep.title === "Payment" && (
          <div className="w-full flex justify-center px-4 py-6">
            <div className="w-[40vw] max-w-5xl pl-5 pr-5 flex flex-col items-center gap-8">
              {/* Info Columns */}
              <h2 className="text-2xl pt-16 font-semibold text-gray-800 text-center">
                Reservation Summary
              </h2>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium text-gray-900">
                      [Service Name]
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barber</span>
                    <span className="font-medium text-gray-900">
                      [Barber Name]
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saloon</span>
                    <span className="font-medium text-gray-900">
                      [Saloon Name]
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium text-gray-900">[Time]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-bold text-green-600">$[Price]</span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-sm text-gray-500 text-center max-w-md">
                Please review your details before proceeding to payment.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm">
                <button
                  onClick={() => setContinueWithoutPayment(true)}
                  className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Continue
                </button>
                <button
                  onClick={() => setContinueWithoutPayment(false)}
                  className="w-full sm:w-auto py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
