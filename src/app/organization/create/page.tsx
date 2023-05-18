import CreateOrganizationForm from "@/components/CreateOrganizationForm";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="h-full gap-6 flex flex-col items-center pt-32">
      <CreateOrganizationForm />
    </div>
  );
};

export default page;
