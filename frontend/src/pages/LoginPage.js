import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import UserContext from "../store/users-context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Axios({
      withCredentials: true,
      credentials: "include",
      method: "POST",
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/login`
    })
      .then((res) => {
        if (res.data.ok) {
          userCtx.login(res.data.user);
          navigate("/");
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="container h-100 mt-3">
      <div className="row h-100 justify-content-center align-items-center">
        <h1 className="text-center">Login</h1>
        <div className="col-10 col-md-8 col-lg-6">
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
                placeholder="Password"
                value={enteredPassword}
                onChange={passwordInputChangeHandler}
              />
            </Form.Group>
            <p className="text-danger">{errorMessage}</p>
            <Button className="btn btn-dark" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
