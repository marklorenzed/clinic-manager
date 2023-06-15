"use client";

import LoadingMask from "@/components/LoadingMask";
import { useAppSelector } from "@/redux/hooks";
import { FC } from "react";

interface LayoutComponentProps {
}

const LayoutComponent: FC<LayoutComponentProps> = ({}) => {
  const { organization, appointment } = useAppSelector((state) => state);


  if (organization.isLoading || appointment.isLoading) return <LoadingMask />

  return null
};

export default LayoutComponent;
