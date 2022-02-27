import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { connect } from "react-redux";
import { setFilter, setReadIndex } from "../actions/bookActions";
import store from "../store";

function SearchBar(props) {
  const { setFilter, setReadIndex } = props;

  const selectReadIndex = (state) => {
    return state.books.readIndex;
  };

  const changeRadio = async (e) => {
    const index = parseInt(e.target.value);

    if (e.target.checked) {
      setReadIndex(selectReadIndex(store.getState()) + index);
    } else {
      setReadIndex(selectReadIndex(store.getState()) - index);
    }

    // searchFilter(searchString.current, readIndex.current);
  };

  return (
    <Fragment>
      <Form>
        <InputGroup className="mb-3">
          {/* {tags.map((tag, index) => (
            <Button
              style={{ marginRight: ".2rem" }}
              size="sm"
              variant="secondary"
              key={index}
            >
              {tag}
            </Button>
          ))} */}
          <FormControl
            placeholder="Hľadaj v názve knihy alebo mene autora"
            onChange={(e) => setFilter(e.target.value)}
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

export default connect(null, { setFilter, setReadIndex })(SearchBar);
