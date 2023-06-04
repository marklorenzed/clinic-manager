import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface TabsProps {
  href: string;
  title: string;
  isActive: boolean;
}

const Tabs: FC<TabsProps> = ({ href, title, isActive }) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "subtle" }),
        `${
          isActive ? "bg-red-400 dark:bg-red-400" : "bg-zinc-600"
        } cursor-pointer text-white rounded-3xl w-1/3 hover:text-zinc-600 dark:hover:text-zinc-600`
      )}
    >
      {title}
    </Link>
  );
};

export default Tabs;
