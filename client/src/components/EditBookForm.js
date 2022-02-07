import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditBookForm(props) {
  const { toggleEdit, book, editBook } = props;
  const [editFormData, setEditFormData] = useState({
    title: book.title,
    author: book.author,
    note: book.note,
    "checkbox-bedo": book.read === 1 || book.read === 3,
    "checkbox-zuzka": book.read === 2 || book.read === 3,
  });

  const handleChange = (e) => {
    let key = e.target.id;
    let value = e.target.value === "on" ? e.target.checked : e.target.value;
    setEditFormData({ ...editFormData, [key]: value });
  };

  return (
    <div className="d-flex justify-content-between">
      <Form id="edit-form" style={{ width: "90%" }}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            type="text"
            onChange={handleChange}
            value={editFormData.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Control
            type="text"
            onChange={handleChange}
            value={editFormData.author}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Control
            as="textarea"
            onChange={handleChange}
            value={editFormData.note}
          />
        </Form.Group>
        <div className="d-flex">
          <Form.Check
            type="checkbox"
            id="checkbox-bedo"
            label="Beďo"
            checked={editFormData["checkbox-bedo"]}
            onChange={handleChange}
            style={{ marginRight: "1rem" }}
          />
          <Form.Check
            type="checkbox"
            id="checkbox-zuzka"
            label="Zuzka"
            checked={editFormData["checkbox-zuzka"]}
            onChange={handleChange}
          />
        </div>
      </Form>
      <div className="d-flex flex-column">
        <Button
          onClick={() => {
            editBook(book.id, editFormData);
            toggleEdit();
          }}
          variant="primary"
        >
          Uložiť
        </Button>
        <Button onClick={toggleEdit} variant="danger" className="mt-1">
          Zrušiť
        </Button>
      </div>
    </div>
  );
}

export default EditBookForm;
