import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MainNavigation = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">TMDB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/tv-shows">TV Shows</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/">SignUp</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
