import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Fab from "@mui/material/Fab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import AddForm from "./components/AddForm";
import BookList from "./components/BookList";
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import LoginForm from "./components/LoginForm";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    getAllBooks();
    checkLogin();
  }, []);

  useEffect(() => {
    setDisplayedBooks(allBooks);
  }, [allBooks]);

  async function getAllBooks() {
    const response = await axios.get("/books");
    setAllBooks(response.data);
    setDisplayedBooks(response.data);
  }

  async function checkLogin() {
    const response = await axios.get("/me");
    if (response.data) {
      setIsLoggedIn(true);
    }
  }

  function toggleShowAddForm() {
    setShowAddForm((prevValue) => !prevValue);
  }

  return (
    <div className="App">
      {showLoginForm && (
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setShowLoginForm={setShowLoginForm}
        />
      )}
      <NavigationBar
        setShowLoginForm={setShowLoginForm}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Container>
        {showAddForm && (
          <AddForm setAllBooks={setAllBooks} allBooks={allBooks} />
        )}
        <SearchBar setDisplayedBooks={setDisplayedBooks} allBooks={allBooks} />
        <BookList
          isLoggedIn={isLoggedIn}
          displayedBooks={displayedBooks}
          allBooks={allBooks}
          setAllBooks={setAllBooks}
          getAllBooks={getAllBooks}
        />
      </Container>
      {isLoggedIn && (
        <Fab
          color={showAddForm ? "secondary" : "primary"}
          className="position-fixed"
          style={{ bottom: "20px", right: "20px" }}
          onClick={toggleShowAddForm}
        >
          {showAddForm ? <CancelIcon /> : <AddIcon />}
        </Fab>
      )}
    </div>
  );
}

export default React.memo(App);
