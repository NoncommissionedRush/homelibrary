import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function LoginForm(props) {
  const { setIsLoggedIn, setShowLoginForm } = props;
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const logIn = async (e, formData) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post("/login", formData, config);

    if (response.data.errorMessage) {
      setShowError(true);
      setErrorMessage(response.data.errorMessage);
      return;
    }

    if (response.data.id) {
      setIsLoggedIn(true);
      setShowLoginForm(false);
    }
  };

  return (
    <Fragment>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          zIndex: "5",
        }}
        onClick={() => setShowLoginForm(false)}
      ></div>
      <Form
        style={{
          width: "50%",
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "6",
          backgroundColor: "#fff",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
        }}
        id="login-form"
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Meno</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        {showError && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          style={{ alignSelf: "center" }}
          variant="primary"
          onClick={(e) => {
            logIn(e, formData);
            setFormData({ name: "", password: "" });
          }}
        >
          Prihlásiť
        </Button>
      </Form>
    </Fragment>
  );
}

export default LoginForm;
