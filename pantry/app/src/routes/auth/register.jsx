// routes/register.js
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Form, redirect } from "react-router-dom";
import { auth } from "/src/firebase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Fetch random user data
    const response = await axios.get("https://randomuser.me/api/");
    const randomUser = response.data.results[0];

    const randomUsername = randomUser.login.username;
    const randomAvatar = `https://robohash.org/${user.uid}.png?size=200x200`;

    await updateProfile(user, {
      displayName: randomUsername,
      photoURL: randomAvatar,
    });

    return redirect("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error creating user: ${errorCode} - ${errorMessage}`);
    return null;
  }
}

export default function Register() {
  return (
    <>
      <h1>Sign Up</h1>
      <Form method="post" action="/register">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Register</button>
      </Form>
    </>
  );
}
