"use client";

import { store } from "@/store";
import { setOrganizationsList } from "@/store/organizationSlice";
import { Organization } from "@prisma/client";
import { useRef } from "react";

export default function Preloader({
  organizations,
}: {
  organizations: Organization[];
}) {
  const loaded = useRef(false);

  if (!loaded.current) {
    // store it in redux on client side
    store.dispatch(setOrganizationsList(organizations));
    loaded.current = true;
  }

  return null;
}
