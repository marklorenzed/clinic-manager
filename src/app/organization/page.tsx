import LargeHeading from "@/components/LargeHeading";
import OrganizationsList from "@/components/OrganizationsList";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "../supabase-server";

const OrganizationListPage = async ({}) => {
  const session = await getSession();

  if (!session) return notFound();

  return (
    <div className="h-full gap-6 flex flex-col items-center pt-32">
      <LargeHeading
        size="lg"
        className="three-d  text-black dark:text-light-gold"
      >
        Select Organization
      </LargeHeading>

      {/* since this is a client side component */}
      {/* we need to preload the data here to access the data in client side redux */}
      <OrganizationsList />
      <div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/organization/create"
        >
          Create your organization
        </Link>
      </div>
    </div>
  );
};

export default OrganizationListPage;
