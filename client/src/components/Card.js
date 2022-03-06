import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Tag from "./Tag";
import { connect } from "react-redux";
import { deleteBook } from "../actions/bookActions";
import Overlay from "./Overlay";
import Confirm from "./Confirm";

function Card({ toggleEdit, book, isLoggedIn, deleteBook }) {
  const [showAlert, setShowAlert] = useState(false);
  let readString;

  switch (book.read) {
    case 0:
      readString = null;
      break;
    case 1:
      readString = "Beďo";
      break;
    case 2:
      readString = "Zuzka";
      break;
    case 3:
      readString = "Beďo, Zuzka";
      break;
    default:
      readString = null;
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <p>
          <b>Poznámka:</b> <i>{book.note}</i>
        </p>
        <p>
          <b>Prečítali:</b> <i>{readString}</i>
        </p>
        {book.tags.map((tag) => tag && <Tag tagName={tag} key={tag.id} />)}
      </div>
      {isLoggedIn && (
        <div className="d-flex flex-column">
          <Button
            onClick={() => {
              toggleEdit();
            }}
            variant="primary"
            className="mb-1"
          >
            Upraviť
          </Button>
          <Button onClick={() => setShowAlert(true)} variant="danger">
            Zmazať
          </Button>
        </div>
      )}
      {showAlert && (
        <Overlay toggleDisplay={setShowAlert}>
          <Confirm confirmAction={() => deleteBook(book.id)} />
        </Overlay>
      )}
    </div>
  );
}

export default connect(null, { deleteBook })(Card);
