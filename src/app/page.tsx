import type { Metadata } from "next";
import LargeHeading from "@/components/LargeHeading";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Clinic Manager",
  description: "Clinic management system",
};

export default async function Home() {
  return (
    <div className="h-full gap-6 flex flex-col justify-center items-center ">
      <LargeHeading
        size="lg"
        className="three-d  text-black dark:text-light-gold"
      >
        Clinic Manager
      </LargeHeading>
      <div className="flex flex-wrap gap-3">
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 h-32"
          )}
          href="/organization"
        >
          Organizations
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 h-32"
          )}
          href="/organization"
        >
          Employees
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 h-32"
          )}
          href="/organization"
        >
          Patients
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 h-32"
          )}
          href="/organization"
        >
          Schedule
        </Link>
      </div>
    </div>
  );
}
