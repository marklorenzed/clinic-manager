import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Appointment } from "@prisma/client";
import { FC } from "react";

export const appointments: Appointment[] = [
  {
    id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
    id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
        id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
        id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
        id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
        id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
  {
    id: "INV001",
    date: new Date(),
    status: "open",
    procedure: "adjust",
    patientId: 'Mark Lorenze Dumalaon',
    createdAt: new Date(),
    updatedAt: new Date(),
    doctorId: null,
    amount: 0
  },
];

interface AppointmentsTableProps {
 
}

const AppointmentsTable: FC<AppointmentsTableProps> = ({}) => {
  return (
    <Table>
      <TableCaption>A list of your recent appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Time</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Procedure</TableHead>
          <TableHead className="hidden md:table-cell">Assignee</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.date.toISOString()}</TableCell>
            <TableCell>{appointment.patientId}</TableCell>
            <TableCell>{appointment.procedure}</TableCell>
            <TableCell className="hidden md:table-cell">{appointment.doctorId}</TableCell>
            <TableCell className="hidden md:table-cell">{appointment.status}</TableCell>
            <TableCell className="text-right">{appointment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AppointmentsTable;