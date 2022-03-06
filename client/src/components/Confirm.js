import React from "react";
import Button from "react-bootstrap/Button";

function Confirm({ confirmAction, toggleDisplay }) {
  const handleClick = () => {
    confirmAction();
    toggleDisplay(false);
  };

  return (
    <div
      style={{
        width: "250px",
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "6",
        backgroundColor: "#fff",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
      id="alert"
    >
      <p>Určite?</p>
      <Button
        style={{ alignSelf: "center" }}
        onClick={handleClick}
        variant="primary"
      >
        OK
      </Button>
    </div>
  );
}

export default Confirm;
