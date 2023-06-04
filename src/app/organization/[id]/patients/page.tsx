"use client"

import { FC } from "react";

interface PageProps {
  params: {
    id: string
  }
}

const PatientsPage: FC<PageProps> = ({ params }) => {

  return <div className='dark:text-white'>Patients</div>
}

export default PatientsPage