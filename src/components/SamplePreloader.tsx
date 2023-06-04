"use client";

import { setOrganizationsList } from "@/redux/features/organizationSlice";
import { store } from "@/redux/store";
import { Organization } from "@prisma/client";
import { useRef } from "react";

export default function Preloader({
  organizations,
}: {
  organizations?: Organization[];
}) {
  const loaded = useRef(false);

  if (!loaded.current) {
    // store it in redux on client side
    if (organizations) {
      store.dispatch(setOrganizationsList(organizations));
    }
    loaded.current = true;
  }

  return null;
}
