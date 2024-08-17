import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../../services/firebase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect(`/${auth.currentUser.displayName}/dashboard`);
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    return redirect("/");
  }
}
