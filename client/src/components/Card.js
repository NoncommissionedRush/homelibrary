import React from "react";
import Button from "react-bootstrap/Button";
import Tag from "./Tag";
import { connect } from "react-redux";
import { deleteBook } from "../actions/bookActions";

function Card(props) {
  const { toggleEdit, book, isLoggedIn, deleteBook, setTags, filterTags } =
    props;

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
        {/* {book.tags.map(
          (tag, index) =>
            tag && (
              <Tag
                setTags={setTags}
                tagName={tag}
                key={index}
                filterTags={filterTags}
              />
            )
        )} */}
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
          <Button onClick={() => deleteBook(book.id)} variant="danger">
            Zmazať
          </Button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { deleteBook })(Card);
