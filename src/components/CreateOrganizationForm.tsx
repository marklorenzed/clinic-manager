"use client";

import { FC, useState } from "react";
import LargeHeading from "./LargeHeading";
import Button from "./ui/Button";

import { toast } from "./ui/Toast";
import { Organization } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import axios from "@/lib/axios";
import { Input } from "./ui/input";

const CreateOrganizationForm: FC = ({}) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState({ name: '', address: '' })

  const createOrganization = async () => {
    try {
      if(!name) {
        return setError({ ...error, name: 'Name is required!' })
      }
      const session = await supabase.auth.getSession();
      const data = await axios.post(
        "/api/organization",
        { name, address },
        {
          headers: {
            Authentication: session.data.session?.access_token,
          },
        }
      );
      const organization: Organization = data.data;

      toast({
        title: "Success!",
        message: `Created ${organization.name} successfully.`,
        type: "success",
      });

      router.push("/organization");
    } catch (error) {
      toast({
        title: "Errror",
        message: "There was an error creating organization",
        type: "error",
      });
    }
  };

  return (
    <div className=" flex flex-col gap-4 px-12">
      <LargeHeading size={"sm"}>Organization Name</LargeHeading>
      <Input
        type="text"
        value={name}
        className={`${error.name ? 'border-red-500' : ''}`}
        onChange={(e) => {
          setName(e.target.value)
          setError({ ...error, name: '' })
        }}
      />
      <LargeHeading size={"sm"}>Address</LargeHeading>
      <Input
        type="text"
        value={address}
        // className="w-full text-sm lg:text-5xl font-bold dark:text-white"
        onChange={(e) => {
          setAddress(e.target.value)
        }}
      />
      <Button variant="default" size={"lg"} onClick={createOrganization}>
        Create
      </Button>
    </div>
  );
};

export default CreateOrganizationForm;
