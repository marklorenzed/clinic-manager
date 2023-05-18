import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async ({}) => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return <div className="pt-32 text-white">page</div>;
};

export default page;
