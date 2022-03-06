import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
// icons
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Fab from "@mui/material/Fab";
// components
import AddForm from "./components/AddForm";
import BookList from "./components/BookList";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import Overlay from "./components/Overlay";

function App() {
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
          <Overlay toggleDisplay={setShowLoginForm}>
            <LoginForm
              setIsLoggedIn={setIsLoggedIn}
              setShowLoginForm={setShowLoginForm}
            />
          </Overlay>
        )}
        <NavigationBar
          setShowLoginForm={setShowLoginForm}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Container>
          {showAddForm && <AddForm />}
          <SearchBar />

          <BookList isLoggedIn={isLoggedIn} />
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

export default App;
