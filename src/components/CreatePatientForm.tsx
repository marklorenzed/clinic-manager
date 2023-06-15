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
import { Appointment, Patient } from "@prisma/client";
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
import { Loader2 } from "lucide-react";
import { toast } from "./ui/Toast";

interface CreatePatientDialogProps {}

type NewPatient = Omit<Patient, "id">;

const CreatePatientDialog: FC<CreatePatientDialogProps> = ({}) => {
  const queryClient = useQueryClient();
  const { supabase } = useSupabase();
  const { selectedOrganization } = useAppSelector(
    (state) => state.organization
  );
  const { selectedDate } = useAppSelector((state) => state.appointment);
  const [successCreate, setSuccessCreate] = useState(false);
  const [newPatient, setNewPatient] = useState<NewPatient>({
    name: "",
    age: 0,
  });

  const createAppointment = async (newPatient: NewPatient) => {
    const session = await supabase.auth.getSession();
    return axios.post(
      `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/api/patient`,
      {
        patient: newPatient,
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
      setSuccessCreate(true);
      setNewPatient({ name: "", age: 0 })
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
    onError: () => {
      toast({
        title: "Errror",
        message: "There was an error creating patient",
        type: "error",
      });
    },
  });

  const onSubmit = () => {
    const { name, age } = newPatient;
    mutation.mutate({ name, age });
  };

  const handleChange = (key: string, value: string | number) => {
    setNewPatient((state) => ({ ...state, [key]: value }));
  };

  return (
    <Dialog onOpenChange={() => { setSuccessCreate(false) }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Create Patient</span>{" "}
          <Icons.PlusIcon className="text-zinc-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Patient</DialogTitle>
          <DialogDescription>Create a new patient here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {mutation.isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              {successCreate ? (
                "successfully created "
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      className="col-span-3"
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="age" className="text-right">
                      Age
                    </Label>
                    <Input
                      type="number"
                      id="age"
                      value={newPatient.age}
                      className="col-span-3"
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        handleChange("age", val);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePatientDialog;
