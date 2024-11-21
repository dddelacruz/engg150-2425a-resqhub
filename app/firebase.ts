// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
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

export async function fetchTableData() {
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
