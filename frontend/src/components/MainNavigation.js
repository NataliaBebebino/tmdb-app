import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../store/users-context";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  const userCtx = useContext(UserContext);

  const logoutHandler = () => {
    userCtx.logout();
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">TMDB</Navbar.Brand>
        {userCtx.isAuthenticated ? (
              <>
                <Navbar.Text>{`Hello ${userCtx.user.userName}!`}</Navbar.Text>          
              </>
            ) : (
              <>
              </>
            )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/movies">Movies</Link>
            <Link to="/tv-shows">TV Shows</Link>
          </Nav>
          <Nav className="justify-content-end">
            {userCtx.isAuthenticated ? (
              <>               
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Link to="/">SignUp</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
