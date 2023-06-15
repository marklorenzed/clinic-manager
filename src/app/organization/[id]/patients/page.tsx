"use client";

import { useSupabase } from "@/app/supabase-provider";
import CreatePatientDialog from "@/components/CreatePatientForm";
import { toast } from "@/components/ui/Toast";
import axios from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { Patient } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const PatientsPage: FC<PageProps> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      const session = await supabase.auth.getSession();
      return axios.get(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_BASE_URL}/api/patient`,
        {
          headers: {
            Authentication: session.data.session?.access_token,
          },
        }
      );
    },
  });

  if (error) {
    toast({
      title: "Errror",
      message: "There was an error loading patients",
      type: "error",
    });
  }
  return (
    <div className="dark:text-white h-full flex flex-col gap-4">
      <div className="flex justify-between">
        <CreatePatientDialog />
      </div>
      <div className="dark:text-white">
          {data?.data.length &&
            data.data.map((patient: Patient) => {
              return <div>{patient.name}</div>;
            })}
        </div>
    </div>
  );
};

export default PatientsPage;
