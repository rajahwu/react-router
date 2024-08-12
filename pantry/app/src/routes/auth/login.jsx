// routes/Login.js

import { useAuth } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, redirect } from "react-router-dom";
import { auth } from "../../firebase";

// Loader function to check if user is already authenticated
export async function loader() {
  const user = auth.currentUser;
  if (user) {
    return redirect(`/${user.displayName}/dashboard`);
  }
  return null;
}

// Action function to handle the form submission
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect(`/${auth.currentUser.displayName}/dashboard`);
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    return redirect("/login");
  }
}

// Login component
export default function Login() {
  const { user } = useAuth();

  if (user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Login</h1>
      <Form method="post" action="/login">
        <input type="text" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
