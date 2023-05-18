"use client";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { FC } from "react";
import { Input } from "@mui/material";
import { setCreate } from "@/store/organizationSlice";
import { AppDispatch, RootState } from "@/store";
import LargeHeading from "./LargeHeading";
import Button from "./ui/Button";
import axios from "axios";
import { toast } from "./ui/Toast";
import { Organization } from "@prisma/client";
import { useRouter } from "next/navigation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const CreateOrganizationForm: FC = ({}) => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.organization.create);
  const router = useRouter();

  const createOrganization = async () => {
    try {
      const data = await axios.post("/api/organization", { name });
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
    <>
      <LargeHeading size={"sm"}>Organization Name:</LargeHeading>
      <Input
        type="text"
        value={name}
        className="w-full text-3xl lg:text-5xl font-bold"
        onChange={(e) => {
          dispatch(setCreate({ name: e.target.value }));
        }}
      />
      <Button variant="default" size={"lg"} onClick={createOrganization}>
        Create
      </Button>
    </>
  );
};

export default CreateOrganizationForm;
