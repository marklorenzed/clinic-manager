"use client";

import {
  setOrganizationsList,
  setSelectedOrganization,
} from "@/store/organizationSlice";
import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./CreateOrganizationForm";
import { Organization } from "@prisma/client";
import { store } from "@/store";

interface OrganizationsListProps {
  organizations: Organization[];
}

const OrganizationsList: FC<OrganizationsListProps> = ({ organizations }) => {
  const { organizationsList } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  const loaded = useRef(false);
  if (!loaded.current) {
    // store it in redux on server side
    store.dispatch(setOrganizationsList(organizations));
    loaded.current = true;
  }

  return (
    <div>
      {organizationsList?.map((organization) => (
        <div onClick={() => dispatch(setSelectedOrganization(organization))}>
          {organization.name || ""}
        </div>
      ))}
    </div>
  );
};

export default OrganizationsList;
