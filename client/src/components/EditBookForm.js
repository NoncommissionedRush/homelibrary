import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tag from "./Tag";
import { connect } from "react-redux";
import { editBook } from "../actions/bookActions";

function EditBookForm(props) {
  const { toggleEdit, book } = props;
  const [displayedTags, setDisplayedTags] = useState(book.tags);
  const [newTagName, setNewTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: book.title,
    author: book.author,
    note: book.note,
    "checkbox-bedo": book.read === 1 || book.read === 3,
    "checkbox-zuzka": book.read === 2 || book.read === 3,
  });

  const handleFormChange = (e) => {
    let key = e.target.id;
    let value = e.target.value === "on" ? e.target.checked : e.target.value;
    setEditFormData({ ...editFormData, [key]: value });
  };

  const handleTagFormChange = (e) => {
    setNewTagName(e.target.value);
  };

  const tagSubmit = async (e) => {
    if (!isLoading && e.key === "Enter") {
      // if the tag already exists do not add it
      if (displayedTags.includes(newTagName)) {
        console.log("jeb");
        setNewTagName("");
        return;
      }

      setIsLoading(true);
      setDisplayedTags((prevValue) => [...prevValue, newTagName]);
      setNewTagName("");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        tagName: newTagName,
      };

      const result = await axios.post(`/book_tag/${book.id}`, data, config);

      if (result) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <Form id="edit-form" style={{ width: "90%" }}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            type="text"
            onChange={handleFormChange}
            value={editFormData.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Control
            type="text"
            onChange={handleFormChange}
            value={editFormData.author}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Control
            as="textarea"
            onChange={handleFormChange}
            value={editFormData.note}
          />
        </Form.Group>
        <div className="d-flex">
          <Form.Check
            type="checkbox"
            id="checkbox-bedo"
            label="Beďo"
            checked={editFormData["checkbox-bedo"]}
            onChange={handleFormChange}
            style={{ marginRight: "1rem" }}
          />
          <Form.Check
            type="checkbox"
            id="checkbox-zuzka"
            label="Zuzka"
            checked={editFormData["checkbox-zuzka"]}
            onChange={handleFormChange}
          />
        </div>
        <div className="d-flex my-2">
          {displayedTags.map((tag, index) =>
            tag !== null ? (
              <Tag
                key={index}
                tagName={tag}
                edit={true}
                setDisplayedTags={setDisplayedTags}
                book={book}
                isLoading={displayedTags[index + 1] ? false : isLoading}
              />
            ) : null
          )}
          <input
            type="text"
            value={newTagName}
            onChange={handleTagFormChange}
            onKeyDown={tagSubmit}
            placeholder="pridať nový tag"
          ></input>
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

export default connect(null, { editBook })(EditBookForm);
