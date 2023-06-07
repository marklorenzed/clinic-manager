"use client";

import LoadingMask from "@/components/LoadingMask";
import { useAppSelector } from "@/redux/hooks";
import { FC } from "react";

interface LayoutComponentProps {
}

const LayoutComponent: FC<LayoutComponentProps> = ({}) => {
  const { isLoading } = useAppSelector((state) => state.organization);

  if (isLoading) return <LoadingMask />

  return null
};

export default LayoutComponent;
