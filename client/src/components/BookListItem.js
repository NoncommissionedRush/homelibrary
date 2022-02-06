import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import EditBookForm from "./EditBookForm";
import Card from "./Card";

function BookListItem(props) {
  const { index, book, editBook, deleteBook, isLoggedIn } = props;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        <b>{book.title}</b>&nbsp;({book.author})
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
          />
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default BookListItem;
