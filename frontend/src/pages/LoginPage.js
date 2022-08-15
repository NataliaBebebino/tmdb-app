import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(enteredData);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
        />

        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={enteredPassword}
          onChange={passwordInputChangeHandler}
        />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Button className="btn btn-dark" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginPage;
