import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Fab from "@mui/material/Fab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import AddForm from "./components/AddForm";
import BookList from "./components/BookList";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import store from "./store";

function App() {
  const [filterTags, setFilterTags] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

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
    <Provider store={store}>
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
          {showAddForm && <AddForm />}
          <SearchBar tags={filterTags} setTags={setFilterTags} />

          <BookList
            isLoggedIn={isLoggedIn}
            setTags={setFilterTags}
            filterTags={filterTags}
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
    </Provider>
  );
}

export default React.memo(App);
