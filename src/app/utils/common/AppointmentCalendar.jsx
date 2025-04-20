"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
    Inject, Day, Week, WorkWeek, Month, Agenda,
    ViewsDirective, ViewDirective, TimelineViews, TimelineMonth,
    
} from "@syncfusion/ej2-react-schedule";

// Dynamically import ScheduleComponent with SSR disabled
const ScheduleComponent = dynamic(
  () => import("@syncfusion/ej2-react-schedule").then((mod) => mod.ScheduleComponent),
  { ssr: false }
);
export default function AppointmentCalendar() {

    const localData = {
        dataSource: [
            {
                Id: 1, //mandatory 
                StartTime: new Date(2025, 1, 18, 14, 0), //2025 , february 17th, 2pm
                EndTime: new Date(2025, 1, 18, 16, 30), //2025 , february 17th, 4:30pm
                Subject: "Test",
                Location: "Chennai",
                Description: "Test Description",
                //IsAllDay:"True",
                //IsBlock: true,
            }
        ]
    }
    
    return (
    <div className="">
              <ScheduleComponent  currentView="Week" eventSettings={localData }>
                  
                  {/* Control displayed views */}
                  <ViewsDirective>
                      <ViewDirective option="Day" displayName="Today" startHour="09:00" endHour="19:00" ></ViewDirective>
                      {/* <ViewDirective option="Week" isSelected='true' ></ViewDirective> */}
                      <ViewDirective option="WorkWeek" displayName="Week"></ViewDirective>
                      <ViewDirective option="Month" showWeekNumber={true} showWeekend={false}></ViewDirective>
                      <ViewDirective option="Agenda"></ViewDirective>
                  </ViewsDirective>
    
            <Inject services={[Day, Week, WorkWeek, Month,Agenda,TimelineMonth , TimelineViews ]} />
              </ScheduleComponent>
              
        </div>
  )
}
