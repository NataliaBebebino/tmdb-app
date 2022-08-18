import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../store/users-context";
import { Link } from "react-router-dom";
import Axios from "axios";

const MainNavigation = () => {
  const userCtx = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const logoutHandler = () => {
    setExpanded(false)
    Axios({
      method: "POST",
      url: "http://localhost:5000/users/logout",
    })
      .then((res) => {
        userCtx.logout();
      })
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark" expanded={expanded}>
      <Container>
        <Navbar.Brand href="/">TMDB</Navbar.Brand>
        {userCtx.isAuthenticated ? (
          <>
            <Navbar.Text
              className="text-info"
              style={{ marginLeft: "0.3rem", marginRight: "1rem" }}
            >{`Hello ${userCtx.user.userName}! 👋`}</Navbar.Text>
          </>
        ) : (
          <></>
        )}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className="link-light text-decoration-none"
              style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
              to="/movies"
              onClick={() => setExpanded(false)}
            >
              Movies
            </Link>
            <Link
              className="link-light text-decoration-none"
              style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
              to="/tv-shows"
              onClick={() => setExpanded(false)}
            >
              TV Shows
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            {userCtx.isAuthenticated ? (
              <>
                <Link
                  className="link-light text-decoration-none"
                  style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
                  to="/favorites"
                  onClick={() => setExpanded(false)}
                >
                  Favorites
                </Link>
                <Link
                  className="link-light text-decoration-none"
                  style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="link-light text-decoration-none"
                  style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
                  to="/signup"
                  onClick={() => setExpanded(false)}
                >
                  SignUp
                </Link>
                <Link
                  className="link-light text-decoration-none"
                  style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
