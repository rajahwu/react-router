import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../../services/firebase";

const demoUser = {
  email: "webuser@mail.com",
  password: "password",
};

export async function action() {
  try {
    await signInWithEmailAndPassword(auth, demoUser.email, demoUser.password);
    return redirect(`/${auth.currentUser.displayName}/dashboard`);
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    return redirect("/");
  }
}
