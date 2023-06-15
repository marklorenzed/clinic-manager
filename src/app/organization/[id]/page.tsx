"use client";

import { FC, useState } from "react";
import { REQUEST_DATE_FORMAT, cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/Button";
import Icons from "@/components/Icons";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DataTable } from "@/components/data-table";
import { columns } from "./AppointmentTableColumns";
import { useSupabase } from "@/app/supabase-provider";
import axios from "@/lib/axios";
import { toast } from "@/components/ui/Toast";
import CreateAppointMentDialog from "@/components/createAppointmentDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setSelectedDate } from "@/redux/features/appointmentSlice";
import { setSelectedOrganization } from "@/redux/features/organizationSlice";
import moment from "moment";

interface PageProps {
  params: {
    id: string;
  };
}

const OrganizationByIDPage: FC<PageProps> = ({ params }) => {
  const { selectedDate } = useAppSelector((state) => state.appointment);

  const dispatch = useAppDispatch();
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      const session = await supabase.auth.getSession();
      return axios.get(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/api/appointment`,
        {
          headers: {
            Authentication: session.data.session?.access_token,
          },
          params: {
            organizationId: params.id,
            date: moment(selectedDate).toISOString()
          },
        }
      );
    },
  });

  if (error) {
    toast({
      title: "Errror",
      message: "There was an error loading appointments",
      type: "error",
    });
  }

  return (
    <div className="dark:text-white h-full flex flex-col gap-4">
      <div className="flex justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Icons.CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(moment(selectedDate).toDate(), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={moment(selectedDate).toDate()}
              onSelect={(e) => {
                if (e) {
                  dispatch(setSelectedDate(e.toDateString()))
                  queryClient.invalidateQueries({ queryKey: ["appointment"] });
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <CreateAppointMentDialog />
      </div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrganizationByIDPage;
