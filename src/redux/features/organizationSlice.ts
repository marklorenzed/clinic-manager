import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Organization } from "@prisma/client";

export interface OrganizationState {
  organizationsList: Organization[];
  selectedOrganization: Organization | null;
  isLoading: boolean;
}

const initialState: OrganizationState = {
  organizationsList: [],
  selectedOrganization: null,
  isLoading: false
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrganizationsList: (state, action: PayloadAction<Organization[]>) => {
      state.organizationsList = action.payload;
    },
    setSelectedOrganization: (state, action: PayloadAction<Organization>) => {
      state.selectedOrganization = action.payload;
    },
  },
});

export const { setOrganizationsList, setSelectedOrganization, setIsLoading } =
  organizationSlice.actions;
export default organizationSlice.reducer;
