"use client"

import { FC } from "react";

interface PageProps {
  params: {
    id: string
  }
}

const EmployeesPage: FC<PageProps> = ({ params }) => {

  return <div className='dark:text-white'>Employees</div>
}

export default EmployeesPage