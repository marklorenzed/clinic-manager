import LargeHeading from "@/components/LargeHeading";
import OrganizationsList from "@/components/OrganizationsList";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { store } from "@/store";
import { setOrganizationsList } from "@/store/organizationSlice";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({}) => {
  // const user: User | null = await currentUser();
  // if (!user?.id) return notFound();

  // const organizations = await db.organization.findMany({
  //   where: { userId: user.id },
  // });

  // store it in redux on server side
  // store.dispatch(setOrganizationsList(organizations));

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
      <OrganizationsList organizations={[]} />
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

export default page;
