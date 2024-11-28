// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  getFirestore,
  query,
  where,
  or,
  and,
  Timestamp,
} from "firebase/firestore";
import { TableData, UserData } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgERyIucNh3QOW90r1hf3rpARFGrDAvsg",
  authDomain: "engg150-2425a-resqhub.firebaseapp.com",
  projectId: "engg150-2425a-resqhub",
  storageBucket: "engg150-2425a-resqhub.firebasestorage.app",
  messagingSenderId: "359949500637",
  appId: "1:359949500637:web:0a7b1c99828bfee8801b34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all logs
export async function fetchTableData(): Promise<TableData[]> {
  const querySnapshot = await getDocs(collection(db, "logs"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TableData[];
}

// Fetch user details by id
export async function fetchUserDetails(userId: string): Promise<UserData> {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const data = userSnapshot.data();
    // Assert the type of `data` to be `UserData`
    return data as UserData;
  } else {
    throw new Error("User not found");
  }
}

// Fetch cumulative logs per hour
export async function fetchCumulativeTableData(
  now: Date
): Promise<TableData[]> {
  const q = query(
    collection(db, "logs"),
    where("timeIn", "<=", Timestamp.fromDate(now))
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TableData[];
}

// Get cumulative count per hour
export async function getCumulativeCount(now: Date): Promise<number> {
  const data = await fetchCumulativeTableData(now); // Get all logs up to a certain hour of the day
  let count = 0;

  for (const d of data) {
    if (d.timeIn != null) {
      count++;
    }

    if (d.timeOut != null && d.timeOut <= Timestamp.fromDate(now)) {
      count--; // If a user timed out beyond the current hour, the count shouldn't be affected
    }
  }
  return count;
}

// Add new user
export async function addUser(user: UserData) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      fName: user.fName,
      mName: user.mName,
      lName: user.lName,
      DOB: user.DOB,
      sex: user.sex,
    });
    console.log("Document added with ID: ", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error adding document ", error);

    return null;
  }
}
