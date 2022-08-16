import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import UserContext from "../store/users-context";
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userCtx = useContext(UserContext);
  const navigate = useNavigate()

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
        navigate("/");
      } else {
        setErrorMessage(res.data.message);
      }
    });
  };

  return (
    <div class="container h-100 mt-3">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
          <Form style={{ maxWidth: 500 }} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={enteredEmail}
                onChange={emailInputChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Set your password"
                value={enteredPassword}
                onChange={passwordInputChangeHandler}
              />
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