import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "./Card";
import EditBookForm from "./EditBookForm";

function BookListItem(props) {
  const { index, book, editBook, deleteBook, isLoggedIn, setTags } = props;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        <div className="d-flex flex-column">
          <b style={{ marginBottom: "5px" }}>{book.title} </b>
          <span>({book.author})</span>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {isEditing ? (
          <EditBookForm
            toggleEdit={toggleEdit}
            book={book}
            editBook={editBook}
          />
        ) : (
          <Card
            book={book}
            isLoggedIn={isLoggedIn}
            toggleEdit={toggleEdit}
            deleteBook={deleteBook}
            setTags={setTags}
          />
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default BookListItem;
