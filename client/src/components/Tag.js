import React from "react";
import Button from "react-bootstrap/esm/Button";

const Tag = (props) => {
  const { tagName, setTags } = props;

  const addTag = (e) => {
    e.preventDefault();
    setTags((prevValue) => [...prevValue, e.target.innerText]);
  };
  return (
    <Button
      size="sm"
      variant="secondary"
      style={{ marginRight: ".5rem" }}
      onClick={addTag}
    >
      {tagName}
    </Button>
  );
};

export default Tag;
