"use client";

import { FC } from "react";
import { useAppSelector } from "./CreateOrganizationForm";

const SelectedOrganization: FC = ({}) => {
  const selectedOrganization = useAppSelector(
    (state) => state.organization.selectedOrganization
  );
  return <div>{selectedOrganization?.name || ""}</div>;
};

export default SelectedOrganization;
