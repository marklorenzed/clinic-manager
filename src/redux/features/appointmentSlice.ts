import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Appointment } from "@prisma/client";

export interface AppointmentState {
  appointmentList: Appointment[];
  selectedOrganization: Appointment | null;
}

const initialState: AppointmentState = {
  appointmentList: [],
  selectedOrganization: null,
};

const organizationSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentList: (state, action: PayloadAction<Appointment[]>) => {
      state.appointmentList = action.payload;
    },
    setSelectedOrganization: (state, action: PayloadAction<Appointment>) => {
      state.selectedOrganization = action.payload;
    },
  },
});

export const { setAppointmentList, setSelectedOrganization } =
  organizationSlice.actions;
export default organizationSlice.reducer;
