"use client";

import { FC, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
import { setIsLoading } from "@/redux/features/organizationSlice";
import AppointmentsTable, { appointments } from "@/components/AppointmentsTable";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface PageProps {
  params: {
    id: string;
  };
}

const OrganizationByIDPage: FC<PageProps> = ({ params }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { isLoading } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();
  const loaded = useRef(false);

  if (!loaded.current) {
    dispatch(setIsLoading(false));
    loaded.current = false;
  }

  return (
    <div className="dark:text-white h-full">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          "Loading..."
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Icons.CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(e) => setDate(e)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        <DataTable columns={columns} data={appointments} />         
      </div>
    </div>
  );
};

export default OrganizationByIDPage;
