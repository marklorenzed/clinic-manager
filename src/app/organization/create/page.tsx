"use client"

import CreateOrganizationForm from "@/components/CreateOrganizationForm";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="h-full flex justify-center items-center">
      <CreateOrganizationForm />
    </div>
  );
};

export default page;
