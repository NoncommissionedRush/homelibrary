import React, { useState, useEffect, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { getBooks } from "../actions/bookActions";
import { filterBooks } from "../reducers/booksReducer";
import BookListItem from "./BookListItem";
import { CircularProgress } from "@mui/material";

const mapStateToProps = (state) => {
  return {
    displayedBooks: filterBooks(state.books.books, state.books.filter),
  };
};

function BookList({ isLoggedIn, getBooks, displayedBooks }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks();
      setIsLoading(!response);
    };
    fetchBooks();
  }, [getBooks]);

  return isLoading ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <Fragment>
      <p className="m-2">
        Spolu <b>{displayedBooks.length}</b> kníh
      </p>
      <Accordion defaultActiveKey="0" style={{ marginTop: "1rem" }}>
        {displayedBooks.map((book, index) => (
          <BookListItem
            key={book.id}
            index={index}
            book={book}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </Accordion>
    </Fragment>
  );
}

export default connect(mapStateToProps, { getBooks })(BookList);
