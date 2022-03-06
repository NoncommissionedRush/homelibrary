import React, { Fragment } from "react";

function Overlay({ children, toggleDisplay }) {
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
        // clicking on overlay closes the login form
        onClick={() => toggleDisplay(false)}
      ></div>
      {React.cloneElement(children, { toggleDisplay })}
    </Fragment>
  );
}

export default Overlay;
