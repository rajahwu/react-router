// routes/Login.js
import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect('/');
  } catch (error) {
    console.error('Error signing in:', error.code, error.message);
    return redirect('/login');
  }
}

export default function Login() {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the home page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <Form method="post" action="/login">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
