"use client";

import { FC, useState } from "react";
import Button, { buttonVariants } from "./ui/Button";
import { toast } from "@/ui/Toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Link
      href="/sign-in"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "flex-1"
      )}
    >
      Sign in
    </Link>
  );
};

export default SignInButton;
