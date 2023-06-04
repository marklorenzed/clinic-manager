import { configureStore } from "@reduxjs/toolkit";

import organizationReducer from "@/redux/features/organizationSlice";
import appointmentReducer from "./features/appointmentSlice";

export const store = configureStore({
  reducer: {
    organization: organizationReducer,
    appointment: appointmentReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;