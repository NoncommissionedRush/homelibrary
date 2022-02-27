import axios from "axios";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import BookListItem from "./BookListItem";

function BookList(props) {
  const {
    displayedBooks,
    allBooks,
    setAllBooks,
    getAllBooks,
    isLoggedIn,
    setTags,
    filterTags,
  } = props;

  const deleteBook = async (id) => {
    const deletionSuccessful = await axios.delete(`/book/${id}`);

    if (!deletionSuccessful) {
      return;
    }

    const updatedList = allBooks.filter((book) => book.id !== id);
    setAllBooks(updatedList);
  };

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
      {displayedBooks.map((book, index) => (
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

export default React.memo(BookList);
