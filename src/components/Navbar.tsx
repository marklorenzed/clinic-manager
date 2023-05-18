import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/ui/Button";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/auth";
import SelectedOrganization from "./SelectedOrganization";

const Navbar = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white-/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Clinic Manager 1.0
          <SelectedOrganization />
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />

          {session ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
