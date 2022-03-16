import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavigationBar({ isLoggedIn, setIsLoggedIn, setShowLoginForm }) {
  const logout = async () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="mb-5 px-3 d-flex justify-content-between"
    >
      <Navbar.Brand>Beďova a Zuzkina Knižnica</Navbar.Brand>
      {isLoggedIn ? (
        <Nav>
          <Nav.Link href="#home" onClick={logout}>
            Odhlásiť
          </Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link href="#" onClick={setShowLoginForm}>
            Prihlásiť
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}

export default NavigationBar;
