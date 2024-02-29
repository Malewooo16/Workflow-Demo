"use client"

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  WeekView,
  DayView
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from '@/utilities/appointments';
import fetchWorkflowTimelines from '../actions/testActions/fetchTimeLines';

//import { appointments } from '../../../demo-data/month-appointments';

export default function PureCalender() {
  
 // const timeLines = await fetchWorkflowTimelines(props.emailAddress)
  //const parsedTimeLines = JSON.parse(timeLines)

  const [currentViewName, setCurrentViewName] = useState('work-week');

  const handleCurrentViewNameChange = (newViewName:any) => {
    setCurrentViewName(newViewName);
  };

 
  
  return (
    <Paper>
      <Scheduler  height={660}>
        <ViewState
          defaultCurrentDate="2024-02-25"
          currentViewName={currentViewName}
          onCurrentViewNameChange={handleCurrentViewNameChange}
        />

        <WeekView startDayHour={7} endDayHour={18} />
        <WeekView
          name="work-week"
          displayName="Work Week"
          excludedDays={[0, 6]}
          startDayHour={7} endDayHour={18}
        />
        <MonthView />
        <DayView />
        <Toolbar />
        <DateNavigator />
        
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
      </Scheduler>
    </Paper>
  );
};


