"use client";

import * as React from "react";

import Icons from "@/components/Icons";
import Button from "@/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";

export default function UserDropDown({ user }: { user: User }) {
  const router = useRouter();
  const { supabase } = useSupabase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="ghost" size="sm">
          <Image
            className="rounded-full"
            width={30}
            height={30}
            src={user.user_metadata.avatar_url}
            alt="profilepic"
          />
          <span className="sr-only">User Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem disabled className="flex flex-col justify-start">
          <span>{user.user_metadata.name}</span>
          <span className="w-full flex items-center">
            <Icons.Mail className="mr-2 h-4 w-4" />
            {user.email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/sign-in");
          }}
        >
          <Icons.Laptop className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
