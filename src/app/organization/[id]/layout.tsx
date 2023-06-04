"use client";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Tabs from "./Tabs";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout: FC<LayoutProps> = ({ children, params }) => {
  const pathname = usePathname();
  const activeLink = () => {
    const slugs = pathname?.split("/");

    const activeLink = slugs ? slugs[slugs.length - 1] : [];
    return activeLink;
  };
  return (
    <div className="pt-32 flex flex-col">
      <div className="w-full flex gap-10 justify-center pb-12">
        <Tabs
          title={"Schedule"}
          href={`/organization/${params.id}`}
          isActive={activeLink() === params.id}
        />
        <Tabs
          title={"Employees"}
          href={`/organization/${params.id}}/employees`}
          isActive={activeLink() === "employees"}
        />
        <Tabs
          title={"Patients"}
          href={`/organization/${params.id}}/patients`}
          isActive={activeLink() === "patients"}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
