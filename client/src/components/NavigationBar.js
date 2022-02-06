import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

function NavigationBar(props) {
  const logout = async () => {
    const response = await axios.get("/logout");

    if (response.data) {
      props.setIsLoggedIn(false);
    }
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="mb-5 px-3 d-flex justify-content-between"
    >
      <Navbar.Brand>Bedova kniznica</Navbar.Brand>
      {props.isLoggedIn ? (
        <Nav>
          <Nav.Link href="#home" onClick={logout}>
            Logout
          </Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link href="#" onClick={props.setShowLoginForm}>
            Login
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}

export default NavigationBar;
