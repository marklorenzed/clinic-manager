"use client";

import { FC, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./CreateOrganizationForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Organization } from "@prisma/client";
import Icons from "./Icons";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsLoading,
  setOrganizationsList,
  setSelectedOrganization,
} from "@/redux/features/organizationSlice";
import axios from "@/lib/axios";
import { useSupabase } from "@/app/supabase-provider";
import { toast } from "./ui/Toast";

const SelectedOrganization: FC = ({}) => {
  const { selectedOrganization, organizationsList, isLoading } = useAppSelector(
    (state) => state.organization
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { supabase } = useSupabase();
  const pathname = usePathname();

  useEffect(() => {
    const pathnameSplit = pathname?.split("/");
    if (pathnameSplit && pathnameSplit[1] === "organization" && pathnameSplit.length === 3) {
      const id = pathnameSplit[pathnameSplit.length - 1];
      const org = organizationsList.find((item) => item.id === id);
      if (org) {
        dispatch(setSelectedOrganization(org));
      }
    }
  }, [pathname]);

  const changeSelectedOrganization = (org: Organization) => {
    dispatch(setIsLoading(true));
    dispatch(setSelectedOrganization(org));
    router.push(`/organization/${org.id}`);
  };

  useEffect(() => {
    async function fetchOrgs() {
      const session = await supabase.auth.getSession();
      dispatch(setIsLoading(true));
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/api/organization`,
          {
            headers: {
              Authentication: session.data.session?.access_token,
            },
          }
        );
        dispatch(setOrganizationsList(data));
      } catch (error) {
        toast({
          title: "Errror",
          message: "There was an error loading organizations",
          type: "error",
        });
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchOrgs();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-4 gap-2" variant="subtle" size="sm" disabled={!isLoading && organizationsList.length === 0}>
          {isLoading ? (
            <Icons.Loader2 className="animate-spin" />
          ) : (
            organizationsList.length === 0 ? "No Organization" :  selectedOrganization?.name || "Select An Organization"
          )}
          <Icons.ChevronDownIcon className="h-4 dark:text-white text-zinc-900" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        {organizationsList.map((org) => {
          return (
            <DropdownMenuItem
              key={org.id}
              onClick={() => changeSelectedOrganization(org)}
            >
              <span>{org.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectedOrganization;
