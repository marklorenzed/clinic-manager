import Link from "next/link";
import { buttonVariants } from "@/ui/Button";
import SignInButton from "@/components/SignInButton";
import ThemeToggle from "@/components/ThemeToggle";
import SelectedOrganization from "./SelectedOrganization";
import UserDropDown from "./UserDropDown";
import { getSession } from "@/app/supabase-server";
import axios from "@/lib/axios";

import Preloader from "@/components/SamplePreloader";
import { store } from "@/redux/store";
import { setOrganizationsList } from "@/redux/features/organizationSlice";
import { Organization } from "@prisma/client";

const Navbar = async ({}) => {
  const session = await getSession();
  
  return (
    <div className="fixed backdrop-blur-sm bg-white-/75 dark:bg-zinc-900 z-50 top-0 left-0 right-0 h-20 border-b border-zinc-300 dark:border-zinc-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Clinic Manager 1.0
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          {session && <SelectedOrganization />}
          <ThemeToggle />

          {session ? (
            <>
              <UserDropDown user={session.user} />
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
