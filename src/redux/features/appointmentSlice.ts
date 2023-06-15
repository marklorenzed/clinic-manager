import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Appointment } from "@prisma/client";

export interface AppointmentState {
  selectedDate: string,
  appointmentList: Appointment[];
  selectedOrganization: Appointment | null;
  isLoading: boolean
}

const initialState: AppointmentState = {
  selectedDate: (new Date()).toDateString(),
  appointmentList: [],
  selectedOrganization: null,
  isLoading: false
};

const organizationSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setAppointmentList: (state, action: PayloadAction<Appointment[]>) => {
      state.appointmentList = action.payload;
    },
    setSelectedOrganization: (state, action: PayloadAction<Appointment>) => {
      state.selectedOrganization = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppointmentList, setSelectedOrganization, setIsLoading, setSelectedDate } =
  organizationSlice.actions;
export default organizationSlice.reducer;
