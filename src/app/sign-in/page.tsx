import supabase from "@/lib/supabaseClient";
import AuthUI from "./AuthUI";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user
  console.log("data", data)
  if (user) redirect("/");

  return (
    <div className="flex justify-center height-screen-helper pt-32">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <AuthUI />
      </div>
    </div>
  );
}
