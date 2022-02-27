import axios from "axios";
import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import BookListItem from "./BookListItem";
import { connect } from "react-redux";
import { getBooks, deleteBook } from "../actions/bookActions";
import { filterBooks } from "../reducers/booksReducer";

const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    filter: state.books.filter,
    readIndex: state.books.readIndex,
  };
};

function BookList(props) {
  const {
    getAllBooks,
    isLoggedIn,
    setTags,
    filterTags,
    getBooks,
    deleteBook,
    books,
    filter,
    readIndex,
  } = props;

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const editBook = async (id, editFormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let read;

    if (editFormData["checkbox-bedo"] && editFormData["checkbox-zuzka"]) {
      read = 3;
    } else if (editFormData["checkbox-zuzka"]) {
      read = 2;
    } else if (editFormData["checkbox-bedo"]) {
      read = 1;
    } else {
      read = 0;
    }

    const data = {
      title: editFormData.title,
      author: editFormData.author,
      note: editFormData.note,
      read: read,
    };

    await axios.put(`/book/${id}`, data, config);
    await getAllBooks();
  };
  return (
    <Accordion defaultActiveKey="0" style={{ marginTop: "1rem" }}>
      {filterBooks(books, filter, readIndex).map((book, index) => (
        <BookListItem
          key={index}
          index={index}
          book={book}
          editBook={editBook}
          deleteBook={() => deleteBook(book.id)}
          isLoggedIn={isLoggedIn}
          setTags={setTags}
          filterTags={filterTags}
        />
      ))}
    </Accordion>
  );
}

export default connect(mapStateToProps, { getBooks, deleteBook })(BookList);
