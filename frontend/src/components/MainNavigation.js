import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../store/users-context";
import { Link } from "react-router-dom";
import Axios from "axios";

const MainNavigation = () => {
  const userCtx = useContext(UserContext);

  const logoutHandler = () => {
    Axios({
      method: "POST",
      url: "http://localhost:5000/users/logout",
    })
      .then((res) => {
        console.log(res);
        userCtx.logout();
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
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
          <></>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} to="/movies">Movies</Link>
          <Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} to="/tv-shows">TV Shows</Link>
          </Nav>
          <Nav className="justify-content-end">
            {userCtx.isAuthenticated ? (
              <>
                <Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} to="/favorites">Favorites</Link>
                <Nav.Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} onClick={logoutHandler}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} to="/signup">SignUp</Link>
                <Link className="link-light text-decoration-none" style={{marginLeft: '0.3rem',marginRight: '0.3rem' }} to="/login">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
