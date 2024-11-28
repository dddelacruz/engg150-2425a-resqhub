"use client";

import Form from "next/form";
import { useState } from "react";

import { UserData } from "../types";
import { Timestamp } from "firebase/firestore";
import { addUser } from "../firebase";

export default function TemporaryId() {
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [birthdate, setDOB] = useState(new Date().toDateString());
  const [sex, setSex] = useState("");

  const [tempId, setId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      fName: first,
      mName: middle,
      lName: last,
      DOB: Timestamp.fromDate(new Date(birthdate)),
      sex: sex,
    } as UserData;

    const docRefId = await addUser(user);

    if (docRefId != null) {
      setFirst("");
      setMiddle("");
      setLast("");
      setDOB(new Date().toDateString());
      setSex("");

      setId(docRefId);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold py-8">Issue Temporary ID</h1>

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 border bg-card text-card-foreground shadow rounded-xl"
        >
          <div className="my-4 text-start">
            <label htmlFor="tempId" className="ext-2m font-bold">
              Temporary ID
            </label>
            <input
              type="text"
              id="tempId"
              name="tempId"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              disabled
              value={tempId}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="first" className="ext-2m font-bold">
              First Name
            </label>
            <input
              type="text"
              id="first"
              name="first"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label htmlFor="middle" className="ext-2m font-bold">
              Middle Name
            </label>
            <input
              type="text"
              id="middle"
              name="middle"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={middle}
              onChange={(e) => setMiddle(e.target.value)}
            />
            <label htmlFor="last" className="ext-2m font-bold">
              Last Name
            </label>
            <input
              type="text"
              id="last"
              name="last"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <label htmlFor="birthdate" className="ext-2m font-bold">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={birthdate}
              onChange={(e) => setDOB(e.target.value)}
            />
            <label htmlFor="age" className="ext-2m font-bold">
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:border-blue-500"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
            <div className="text-end">
              <button
                type="submit"
                className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
