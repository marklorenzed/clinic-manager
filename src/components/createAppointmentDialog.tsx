import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import Icons from "./Icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useSupabase } from "@/app/supabase-provider";
import { Appointment } from "@prisma/client";
import { useAppSelector } from "@/redux/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import moment from "moment";
import { REQUEST_DATE_FORMAT } from "@/lib/utils";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface CreateAppointMentDialogProps {}

type NewAppointment = Omit<Appointment, "id" | "createdAt" | "updatedAt">;

const CreateAppointMentDialog: FC<CreateAppointMentDialogProps> = ({}) => {
  const queryClient = useQueryClient();
  const { supabase } = useSupabase();
  const { selectedOrganization } = useAppSelector(
    (state) => state.organization
  );
  const { selectedDate } = useAppSelector((state) => state.appointment);

  const [newAppointment, setNewAppointmet] = useState<
    Omit<NewAppointment, "organizationId">
  >({
    date: new Date(),
    amount: 1000,
    patientId: "",
    procedure: ["rb"],
    status: "",
    doctorId: "",
  });

  const createAppointment = async (newAppointment: NewAppointment) => {
    const session = await supabase.auth.getSession();
    return axios.post(
      `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/api/appointment`,
      {
        appointment: newAppointment,
      },
      {
        headers: {
          Authentication: session.data.session?.access_token,
        },
      }
    );
  };

  const mutation = useMutation(createAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });

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
            organizationId: selectedOrganization?.id || "",
            date: moment(selectedDate).format(REQUEST_DATE_FORMAT),
          },
        }
      );
    },
  });

  const onSubmit = () => {
    const { date, amount, patientId, procedure, status, doctorId } =
      newAppointment;

    mutation.mutate({
      date,
      amount,
      patientId,
      procedure,
      status,
      doctorId,
      organizationId: selectedOrganization?.id || "",
    });
  };

  const getHour = () => {
    const hour = moment(newAppointment.date).hours();
    if (!hour) return "12";
    if (hour > 12) {
      const hh = hour - 12;

      // if hour is 0 (12 midnight)
      if (!hh) return "12";
      if (hh <= 9) return `0${hh}`;
      return hh.toString();
    }
    if (hour < 10) return `0${hour}`;

    return hour.toString();
  };

  const getMinute = () => {
    const minute = moment(newAppointment.date).minutes().toString();

    if (minute !== "00" && minute !== "30") {
      return "00";
    }
    return minute;
  };

  const ampm = moment(newAppointment.date).format("a");

  const handleTimeChange = (val: string, key: string) => {
    const hour = getHour();
    const minute = getMinute();
    let time = `${hour}:${minute} ${ampm}`;
    if (key === "hour") {
      time = `${val}:${minute} ${ampm}`;
    } else if (key === "minute") {
      time = `${hour}:${val} ${ampm}`;
    } else if (key === "ampm") {
      time = `${hour}:${minute} ${val}`;
    }
    const dateString = moment(selectedDate + " " + time).format(
      REQUEST_DATE_FORMAT + " hh:mm a"
    );
    setNewAppointmet((state) => ({
      ...state,
      date: new Date(dateString),
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Create Appointment</span>{" "}
          <Icons.PlusIcon className="text-zinc-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
          <DialogDescription>Create a new appointment here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Date
            </Label>
            <div className="flex items-center col-span-3 border-input border-2 rounded-md">
              <Select
                value={getHour()}
                onValueChange={(e) => handleTimeChange(e, "hour")}
              >
                <SelectTrigger withIcon={false} className="border-0 w-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">1</SelectItem>
                    <SelectItem value="02">2</SelectItem>
                    <SelectItem value="03">3</SelectItem>
                    <SelectItem value="04">4</SelectItem>
                    <SelectItem value="05">5</SelectItem>
                    <SelectItem value="06">6</SelectItem>
                    <SelectItem value="07">7</SelectItem>
                    <SelectItem value="08">8</SelectItem>
                    <SelectItem value="09">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="text-xl mx-1">:</span>
              <Select
                value={getMinute()}
                defaultValue="00"
                onValueChange={(e) => handleTimeChange(e, "minute")}
              >
                <SelectTrigger withIcon={false} className="border-0 w-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={ampm}
                onValueChange={(e) => handleTimeChange(e, "ampm")}
              >
                <SelectTrigger withIcon={false} className="border-0 w-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointMentDialog;
