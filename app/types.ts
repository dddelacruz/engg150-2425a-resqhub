import { Timestamp } from "firebase/firestore";

export type TableData = {
  id: string;
  timeIn: Timestamp;
  timeOut: Timestamp;
};

export type UserData = {
  fName: string;
  mName: string;
  lName: string;
  DOB: Timestamp;
  sex: string;
};
