import React from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

const Tag = (props) => {
  const {
    tagName,
    setTags,
    edit,
    isLoading,
    setDisplayedTags,
    book,
    filterTags,
  } = props;

  const addTag = (e) => {
    e.preventDefault();
    if (filterTags.includes(e.target.innerText)) {
      setTags((prevValue) =>
        prevValue.filter((tag) => tag !== e.target.innerText)
      );
      return;
    }
    setTags((prevValue) => [...prevValue, e.target.innerText]);
  };

  const deleteTag = async (e, tag) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };

    const formData = {
      tagName: tag,
    };

    const response = await axios.delete(`/book_tag/${book.id}`, {
      headers: headers,
      data: formData,
    });

    if (response) {
      setDisplayedTags((prevValue) => prevValue.filter((e) => e !== tag));
    }
  };

  return edit ? (
    <Button
      size="sm"
      variant="danger"
      disabled={isLoading}
      style={{ marginRight: ".2rem" }}
      onClick={isLoading ? null : (e) => deleteTag(e, tagName)}
    >
      {isLoading ? "loading" : `${tagName} X`}
    </Button>
  ) : (
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
