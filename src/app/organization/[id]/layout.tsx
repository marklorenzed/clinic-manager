import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-32 flex flex-col">
      <div className="w-full flex gap-5 justify-center pb-12">
        <div
          className={cn(
            buttonVariants({ variant: "subtle" }),
            "bg-zinc-600 cursor-pointer text-white"
          )}
        >
          Schedule
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "subtle" }),
            "bg-zinc-600 cursor-pointer text-white"
          )}
        >
          Doctors
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "subtle" }),
            "bg-zinc-600 cursor-pointer text-white"
          )}
        >
          Patients
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default page;
