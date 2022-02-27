import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  SET_FILTER,
  SET_READ_INDEX,
} from "./types";
import axios from "axios";

export const getBooks = () => async (dispatch) => {
  const response = await axios.get("/books");
  if (response) {
    dispatch({
      type: GET_BOOKS,
      payload: response.data,
    });
  }
};

export const addBook = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const result = await axios.post("/book", formData, config);

  if (result.data.errorMessage) {
    return false;
  }

  dispatch({
    type: ADD_BOOK,
    payload: formData,
  });

  return true;
};

export const deleteBook = (id) => async (dispatch) => {
  const deletionSuccessful = await axios.delete(`/book/${id}`);

  if (!deletionSuccessful) return;

  dispatch({
    type: DELETE_BOOK,
    payload: id,
  });
};

export const setFilter = (filterString) => (dispatch) => {
  dispatch({
    type: SET_FILTER,
    payload: filterString,
  });
};

export const setReadIndex = (readIndex) => (dispatch) => {
  dispatch({
    type: SET_READ_INDEX,
    payload: readIndex,
  });
};
