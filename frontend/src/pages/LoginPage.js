import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import UserContext from "../store/users-context";

const LoginPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userCtx = useContext(UserContext);

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    Axios({
      method: "POST",
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/login",
    }).then((res) => {
      console.log(res);
      if (res.data.user) {
        userCtx.login(res.data.user);
      } else {
        setErrorMessage(res.data.message);
      }
    });
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
      <p>{errorMessage}</p>

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
