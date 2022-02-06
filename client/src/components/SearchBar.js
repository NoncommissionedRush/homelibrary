import React, { Fragment, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

function SearchBar(props) {
  const searchString = useRef("");
  const readIndex = useRef(0);
  const { setDisplayedBooks, allBooks } = props;

  const searchFilter = (searchString, readIndex) => {
    setDisplayedBooks(
      allBooks
        .filter(
          (book) =>
            book.author.toLowerCase().includes(searchString.toLowerCase()) ||
            book.title.toLowerCase().includes(searchString.toLowerCase())
        )
        .filter((book) => {
          switch (readIndex) {
            case 0:
              return book;
            case 1:
              return book.read === 1 || book.read === 3;
            case 2:
              return book.read === 2 || book.read === 3;
            case 3:
              return book.read === 3;
            default:
              return book;
          }
        })
    );
  };

  const stringFilter = (e) => {
    searchString.current = e.target.value;
    searchFilter(searchString.current, readIndex.current);
  };

  const changeRadio = async (e) => {
    const index = parseInt(e.target.value);

    if (e.target.checked) {
      readIndex.current += index;
    } else {
      readIndex.current -= index;
    }

    searchFilter(searchString.current, readIndex.current);
  };

  return (
    <Fragment>
      <Form>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search" onChange={stringFilter} />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>
      <label className="m-2">
        <input
          type="checkbox"
          value={1}
          name="hovno"
          data-name="bedo"
          onChange={changeRadio}
          style={{ marginRight: "0.3rem" }}
        />
        Bedo
      </label>
      <label>
        <input
          type="checkbox"
          value={2}
          name="hovno"
          data-name="zuzka"
          onChange={changeRadio}
          style={{ marginRight: "0.3rem" }}
        />
        Zuzka
      </label>
    </Fragment>
  );
}

export default SearchBar;
