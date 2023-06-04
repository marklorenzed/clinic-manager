"use client";

import { FC, useEffect, useRef } from "react";
import { Organization } from "@prisma/client";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedOrganization } from "@/redux/features/organizationSlice";
import Icons from "./Icons";

interface OrganizationsListProps {}

const OrganizationsList: FC<OrganizationsListProps> = ({}) => {
  const { organizationsList, isLoading } = useAppSelector(
    (state) => state.organization
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectOrganization = (organization: Organization) => {
    dispatch(setSelectedOrganization(organization));
  };

  return (
    <div className="flex flex-col gap-4 text-white w-64 items-center">
      {isLoading ? (
        <Icons.Loader2 className="animate-spin" />
      ) : (
        organizationsList?.map((organization) => (
          <div
            className={cn(
              buttonVariants({ variant: "subtle" }),
              "shadow-sm cursor-pointer w-full text-2xl border-2"
            )}
            key={organization.id}
            onClick={() => {
              selectOrganization(organization);
              router.push(`/organization/${organization.id}`);
            }}
          >
            {organization.name || ""}
          </div>
        ))
      )}
    </div>
  );
};

export default OrganizationsList;
