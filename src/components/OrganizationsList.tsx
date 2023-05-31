"use client";

import {
  setOrganizationsList,
  setSelectedOrganization,
} from "@/store/organizationSlice";
import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./CreateOrganizationForm";
import { Organization } from "@prisma/client";
import { store } from "@/store";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";
import { useSupabase } from "@/app/supabase-provider";
import { toast } from "./ui/Toast";
import { useRouter } from "next/navigation";

interface OrganizationsListProps {
}

const OrganizationsList: FC<OrganizationsListProps> = () => {
  const { organizationsList } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();
  const { supabase } = useSupabase();
  const router = useRouter()

  useEffect(() => {
    async function fetchOrganizations() {
      let organizations: Organization[] = [];

      try {
        const session = await supabase.auth.getSession();
        const response = await axios.get("/api/organization", {
          headers: {
            Authentication: session.data.session?.access_token,
          },
        });

        if (response.data) {
          organizations = response.data;

          dispatch(setOrganizationsList(organizations));
        }
      } catch (error) {
        toast({
          title: "Errror",
          message: "There was an error fetching organizations",
          type: "error",
        });
      }
    }

    fetchOrganizations();
  }, []);

  const selectOrganization = (organization: Organization) => {
    dispatch(setSelectedOrganization(organization));
  };

  return (
    <div className="flex flex-col gap-4 text-white w-auto">
      {organizationsList?.map((organization) => (
        <div
          className={cn(
            buttonVariants({ variant: "subtle" }),
            "shadow-sm  cursor-pointer w-full text-4xl p-10"
          )}
          key={organization.id}
          onClick={() => {
            selectOrganization(organization)
            router.push(`/organization/${organization.id}`)
          }}
        >
          {organization.name || ""}
        </div>
      ))}
    </div>
  );
};

export default OrganizationsList;
