// src/router/loaders/sign-in.js
import { auth } from "../../services/firebase";

export async function loader() {
  const user = auth.currentUser;
  if (user) {
    return redirect(`/${user.displayName}/dashboard`);
  }
  return null;
}
