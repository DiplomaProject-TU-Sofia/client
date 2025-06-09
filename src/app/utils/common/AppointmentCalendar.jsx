"use client";
import React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  TimelineMonth,
  TimelineViews,
  Resize,
  DragAndDrop,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import {
  fetchAndMapReservations,
  onActionComplete,
  onPopupOpen,
} from "../services/worker";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

// Dynamically import ScheduleComponent with SSR disabled
const ScheduleComponent = dynamic(
  () =>
    import("@syncfusion/ej2-react-schedule").then(
      (mod) => mod.ScheduleComponent
    ),
  { ssr: false }
);

export default function AppointmentCalendar() {
  const [reservations, setReservations] = useState({ dataSource: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAndMapReservations(setReservations);
  }, []);

  return (
    <>
     <ToastContainer style={{zIndex: 9999}} />
      {isLoading ? <Loader /> : null}
      <div className="p-11">
        <ScheduleComponent
          actionComplete={(args) => onActionComplete(args, setIsLoading, toast)}
          currentView="Week"
          eventSettings={reservations}
          popupOpen={onPopupOpen}
          cssClass="virtual-scrolling"
          width="95vw"
          height="80vh"
        >
          {/* Control displayed views */}
          <ViewsDirective>
            <ViewDirective
              option="Day"
              displayName="Today"
              startHour="01:00"
              endHour="24:00"
            ></ViewDirective>
            {/* <ViewDirective option="Week" isSelected='true' ></ViewDirective> */}
            <ViewDirective option="week" displayName="Week"></ViewDirective>
            <ViewDirective
              option="Month"
              showWeekNumber={true}
              showWeekend={true}
            ></ViewDirective>
            <ViewDirective option="Agenda"></ViewDirective>
          </ViewsDirective>

          <Inject
            services={[
              Day,
              Week,
              WorkWeek,
              Month,
              Agenda,
              TimelineMonth,
              TimelineViews,
              DragAndDrop,
              Resize,
            ]}
          />
        </ScheduleComponent>
      </div>
    </>
  );
}
