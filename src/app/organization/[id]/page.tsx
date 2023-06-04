"use client";

import { FC, useState } from "react";
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

interface PageProps {
  params: {
    id: string;
  };
}

const OrganizationByIDPage: FC<PageProps> = ({ params }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="dark:text-white h-full">
      <div className="flex flex-col">
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
        <div> content</div>
      </div>
    </div>
  );
};

export default OrganizationByIDPage;
