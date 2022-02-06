import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function AddForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    note: "",
  });

  const { title, author, note } = formData;
  const { setAllBooks } = props;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const addBook = async (e, formData) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/book", formData, config);
    setAllBooks((prevValue) => {
      return [...prevValue, formData];
    });
  };

  return (
    <Form
      className="mb-5"
      onSubmit={(e) => {
        addBook(e, formData);
        setFormData({
          title: "",
          author: "",
          note: "",
        });
      }}
    >
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Book title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book author"
          value={author}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add note"
          value={note}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddForm;
