import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import UserContext from "../store/users-context";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const usernameInputChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    var submitErrors = {};
    var submitOK = true;

    if (!enteredUsername || enteredUsername === "") {
      submitOK = false;
      submitErrors.username = "The username is required";
    }
    if (!enteredEmail || enteredEmail === "") {
      submitOK = false;
      submitErrors.email = "The email is required";
    }
    if (!enteredPassword || enteredPassword === "") {
      submitOK = false;
      submitErrors.password = "The password is required";
    }

    setErrors(submitErrors);

    if (!submitOK) return;

    Axios({
      method: "POST",
      data: {
        userName: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/new",
    })
      .then((res) => {
        console.log(res);

        if (res.data.ok) {
          navigate("/login");
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="container h-100 mt-3">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
          <Form style={{ maxWidth: 500 }} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={enteredUsername}
                onChange={usernameInputChangeHandler}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={enteredEmail}
                onChange={emailInputChangeHandler}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Set your password"
                value={enteredPassword}
                onChange={passwordInputChangeHandler}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <p className="text-danger">{errorMessage}</p>
            <Button className="btn btn-dark" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
