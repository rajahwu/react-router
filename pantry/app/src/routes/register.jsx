// routes/register.js
import { Form, useNavigate, redirect } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`User created: ${user.uid}`);
    return redirect("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error creating user: ${errorCode} - ${errorMessage}`);
    return null;
  }
}

export default function Register() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Sign Up</h1>
      <Form method="post" action="/register">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">
          Register
        </button>
      </Form>
    </>
  );
}
