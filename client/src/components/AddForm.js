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
  const [error, setError] = useState(false);

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

    const result = await axios.post("/book", formData, config);

    if (result.data.errorMessage) {
      setError(true);
      return;
    }

    // add new book to all books and sort alphabetically case insensitively
    setAllBooks((prevValue) => {
      return [...prevValue, formData].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
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
        <Form.Label>Názov knihy</Form.Label>
        <Form.Control
          type="text"
          placeholder="Názov knižky sem"
          value={title}
          onChange={(e) => handleChange(e)}
          style={error ? { borderColor: "#ff2e2e" } : null}
        />
        {error && (
          <Form.Text style={{ color: "#ff2e2e" }}>Title is required</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Meno autora</Form.Label>
        <Form.Control
          type="text"
          placeholder="Meno autora sem"
          value={author}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Poznámka</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Poznámka sem"
          value={note}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Uložiť
      </Button>
    </Form>
  );
}

export default AddForm;
