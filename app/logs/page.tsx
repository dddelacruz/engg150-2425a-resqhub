"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function calculateAge(dob: Date): number {
  const today = new Date();
  const birthDate = new Date(dob);
  console.log(birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && day < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

import { fetchTableData, fetchUserDetails } from "../firebase";
import { TableData, UserData } from "../types";

export default function Logs() {
  const [data, setData] = useState<TableData[]>([]);
  const [userData, setUserData] = useState<{ [key: string]: UserData }>({});

  useEffect(() => {
    const loadData = async () => {
      const tableData = await fetchTableData();
      setData(tableData);

      const userDetails: { [key: string]: UserData } = {};
      for (const item of tableData) {
        try {
          const user = await fetchUserDetails(item.id);
          userDetails[item.id] = user;
        } catch (error) {
          console.log(`Error fetching user data for ID ${item.id}:`, error);
        }
      }
      setUserData(userDetails);
    };

    loadData();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold py-8">Log of Scanned QR Codes</h1>

      <Table className="max-w-4xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Time In</TableHead>
            <TableHead className="text-center">Time Out</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Sex</TableHead>
            <TableHead className="text-center">Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {item.timeIn.toDate().toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {item.timeOut?.toDate().toLocaleTimeString() || "-"}
              </TableCell>
              <TableCell>{userData[item.id]?.lName || "-"}</TableCell>
              <TableCell>{userData[item.id]?.fName || "-"}</TableCell>
              <TableCell>{userData[item.id]?.sex || "-"}</TableCell>
              <TableCell>
                {userData[item.id]?.DOB
                  ? calculateAge(userData[item.id]?.DOB.toDate())
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
