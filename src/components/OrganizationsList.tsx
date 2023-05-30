"use client";

import {
  setOrganizationsList,
  setSelectedOrganization,
} from "@/store/organizationSlice";
import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./CreateOrganizationForm";
import { Organization } from "@prisma/client";
import { store } from "@/store";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";

interface OrganizationsListProps {
  organizations: Organization[];
}

const OrganizationsList: FC<OrganizationsListProps> = ({ organizations }) => {
  const { organizationsList } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();
  console.log(organizationsList);
  const loaded = useRef(false);
  if (!loaded.current) {
    // store it in redux on server side
    store.dispatch(setOrganizationsList(organizations));
    loaded.current = true;
  }

  const selectOrganization = (organization: Organization) => {
    dispatch(setSelectedOrganization(organization));
  };

  return (
    <div className="flex flex-col gap-4 text-white w-64">
      {organizationsList?.map((organization) => (
        <div
          className={cn(
            buttonVariants({ variant: "subtle" }),
            "shadow-sm  cursor-pointer w-full"
          )}
          key={organization.id}
          onClick={() => selectOrganization(organization)}
        >
          {organization.name || ""}
        </div>
      ))}
    </div>
  );
};

export default OrganizationsList;
