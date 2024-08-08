// routes/SignOut.js
import { redirect } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "/src/firebase";

export async function action() {
  try {
    await signOut(auth);
    return redirect("/login");
  } catch (error) {
    console.error("Error signing out:", error.code, error.message);
    return redirect("/");
  }
}

export default function SignOut() {
  return null;
}
