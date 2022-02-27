import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { deleteBook, getBooks } from "../actions/bookActions";
import { filterBooks } from "../reducers/booksReducer";
import BookListItem from "./BookListItem";

const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    filter: state.books.filter,
    readIndex: state.books.readIndex,
  };
};

function BookList(props) {
  const {
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

  return (
    <Accordion defaultActiveKey="0" style={{ marginTop: "1rem" }}>
      {filterBooks(books, filter, readIndex).map((book, index) => (
        <BookListItem
          key={index}
          index={index}
          book={book}
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
