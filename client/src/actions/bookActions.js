import axios from "axios";
import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  SET_FILTER,
  SET_READ_INDEX,
} from "./types";

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

export const editBook = (id, editFormData) => async (dispatch) => {
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

  dispatch(getBooks());
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
