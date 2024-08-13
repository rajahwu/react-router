import React from "react";
import { Form } from "react-router-dom";

export default function SignOut() {
    return (
        <div>
            <h1>Sign Out</h1>
            <p>Are you sure you want to sign out?</p>
            <Form method="post" action="/signout">
                <button type="submit">Sign Out</button>
            </Form>
        </div>
    )
}