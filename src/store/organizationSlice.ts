import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Organization } from "@prisma/client";

export interface OrganizationState {
  create: {
    name: string;
  };
  organizationsList: Organization[];
  selectedOrganization: Organization | null;
}

const initialState: OrganizationState = {
  create: {
    name: "",
  },
  organizationsList: [],
  selectedOrganization: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setCreate: (state, action: PayloadAction<{ name: string }>) => {
      state.create = action.payload;
    },
    setOrganizationsList: (state, action: PayloadAction<Organization[]>) => {
      state.organizationsList = action.payload;
    },
    setSelectedOrganization: (state, action: PayloadAction<Organization>) => {
      state.selectedOrganization = action.payload;
    },
  },
});

export const { setCreate, setOrganizationsList, setSelectedOrganization } =
  organizationSlice.actions;
export default organizationSlice.reducer;
