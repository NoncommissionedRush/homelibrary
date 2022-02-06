import React from "react";
import Button from "react-bootstrap/Button";

function Card(props) {
  const { toggleEdit, book, isLoggedIn, deleteBook } = props;

  let readString;

  switch (book.read) {
    case 0:
      readString = null;
      break;
    case 1:
      readString = "Bedo";
      break;
    case 2:
      readString = "Zuzka";
      break;
    case 3:
      readString = "Bedo, Zuzka";
      break;
    default:
      readString = null;
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <p>
          <b>note:</b> <i>{book.note}</i>
        </p>
        <p>
          <b>read:</b> <i>{readString}</i>
        </p>
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
            Edit
          </Button>
          <Button onClick={() => deleteBook(book.id)} variant="danger">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Card);
