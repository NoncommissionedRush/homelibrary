import React, { Fragment, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

function SearchBar(props) {
  const searchString = useRef("");
  const readIndex = useRef(0);
  const { setDisplayedBooks, allBooks, tags, setTags } = props;

  const searchFilter = useCallback(
    (searchString, readIndex) => {
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
          .filter((book) => {
            if (tags.length === 0) return book;
            return tags.every((tag) => book.tags.includes(tag));
          })
      );
    },
    [allBooks, setDisplayedBooks, tags]
  );

  useEffect(() => {
    searchFilter(searchString.current, readIndex.current);
  }, [tags, searchFilter]);

  const removeTagFromFilter = (e) => {
    e.preventDefault();
    setTags(tags.filter((tag) => tag !== e.target.innerText));
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
          {tags.map((tag, index) => (
            <Button
              style={{ marginRight: ".2rem" }}
              size="sm"
              variant="secondary"
              key={index}
              onClick={removeTagFromFilter}
            >
              {tag}
            </Button>
          ))}
          <FormControl
            placeholder="Hľadaj v názve knihy alebo mene autora"
            onChange={stringFilter}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Hľadať
          </Button>
        </InputGroup>
      </Form>
      <label className="m-2">
        <input
          type="checkbox"
          value={1}
          name="displayread"
          data-name="bedo"
          onChange={changeRadio}
          style={{ marginRight: "0.3rem" }}
        />
        Beďove prečítané
      </label>
      <label>
        <input
          type="checkbox"
          value={2}
          name="displayread"
          data-name="zuzka"
          onChange={changeRadio}
          style={{ marginRight: "0.3rem" }}
        />
        Zuzkine prečítané
      </label>
    </Fragment>
  );
}

export default SearchBar;
