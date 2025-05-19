"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// import {
//     Inject, Day, Week, WorkWeek, Month, Agenda,
//     ViewsDirective, ViewDirective, TimelineViews, TimelineMonth,
    
// } from "@syncfusion/ej2-react-schedule";

import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import {
    Day, Week, WorkWeek, Month, Agenda, Inject, TimelineMonth, TimelineViews , Resize, DragAndDrop, ViewsDirective, ViewDirective,
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';

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
                StartTime: new Date(2025, 4, 17, 7, 0), //2025 , may 17th, 7:00 am
                EndTime: new Date(2025, 4, 17, 8, 0), //2025 , may 17th, 8:00 am
                Subject: "Test",
                Location: "Chennai",
                Description: "Man haircut",
                // IsAllDay:"True",
                //IsBlock: true,
            }
        ]
    }

    let connection;
    const data = extend([], localData.dataSource, null, true);
    let isHubConnected = false;
    const [eventSettings, setEventSettings] = useState({ dataSource: data });
    // const [currentView, setCurrentView] = useState("Week");
    const onCreated = () => {
        const url = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
        connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        connection.on('ReceiveData', (action, data) => {
            if (action == 'view') {
                setCurrentView(data);
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                setEventSettings({ dataSource: data });
            }
        });
        connection.start().then(() => { isHubConnected = true; }).catch(() => { isHubConnected = false; });
    };
    const onNavigating = (args) => {
        if (args.action == 'view' && isHubConnected) {
            connection.invoke('SendData', args.action, args.currentView);
        }
    };
    const onActionComplete = (args) => {
        if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            connection.invoke('SendData', args.requestType, eventSettings.dataSource);
        }
    };
    const componentWillUnmount = () => {
        if (connection) {
            connection.stop().then(() => { isHubConnected = false; }).catch((err) => { console.log(err); });
        }
    };


    return (
    <div className="">
            <ScheduleComponent actionComplete={onActionComplete} navigating={onNavigating} created={onCreated} currentView="Week" eventSettings={localData} >
                  
                  {/* Control displayed views */}
                  <ViewsDirective>
                      <ViewDirective option="Day" displayName="Today" startHour="07:00" endHour="19:00" ></ViewDirective>
                      {/* <ViewDirective option="Week" isSelected='true' ></ViewDirective> */}
                      <ViewDirective option="week" displayName="Week"></ViewDirective>
                      <ViewDirective option="Month" showWeekNumber={true} showWeekend={true}></ViewDirective>
                      <ViewDirective option="Agenda"></ViewDirective>
                  </ViewsDirective>
    
            <Inject services={[Day, Week, WorkWeek, Month,Agenda,TimelineMonth , TimelineViews ]} />
              </ScheduleComponent>
              
        </div>
  )
}
