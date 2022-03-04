import axios from "axios";
import {
  AXIOS_REQUEST_CONFIG,
  ADD_BOOK,
  ADD_TAG,
  DELETE_BOOK,
  GET_BOOKS,
  SET_FILTER,
  DELETE_TAG,
  EDIT_BOOK,
} from "./types";

export const getBooks = () => async (dispatch) => {
  const response = await axios.get("/books");
  if (response) {
    dispatch({
      type: GET_BOOKS,
      payload: response.data,
    });
    return true;
  }
  return false;
};

export const addBook = (formData) => async (dispatch) => {
  try {
    const newBookId = await axios.post("/book", formData, AXIOS_REQUEST_CONFIG);

    if (newBookId.data.errorMessage) {
      return false;
    }

    const newBook = await axios.get(`/book/${newBookId.data}`);

    dispatch({
      type: ADD_BOOK,
      payload: newBook.data,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
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

  await axios.put(`/book/${id}`, data, AXIOS_REQUEST_CONFIG);

  dispatch(getBooks());
};

export const setFilter = (filter) => (dispatch) => {
  dispatch({
    type: SET_FILTER,
    payload: filter,
  });
};

export const deleteTag = (bookId, tag) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const formData = {
    tagName: tag,
  };

  try {
    await axios.delete(`/book_tag/${bookId}`, {
      headers: headers,
      data: formData,
    });

    const updatedBook = await axios.get(`/book/${bookId}`);

    dispatch({
      type: DELETE_TAG,
      payload: updatedBook.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTag = (bookId, tag) => async (dispatch) => {
  try {
    const result = await axios.post(
      `/book_tag/${bookId}`,
      { tagName: tag },
      AXIOS_REQUEST_CONFIG
    );

    if (!result) return false;

    const updatedBook = await axios.get(`/book/${bookId}`);

    if (updatedBook.data === undefined) return false;

    dispatch({
      type: ADD_TAG,
      payload: updatedBook.data,
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (bookId, editFormData) => async (dispatch) => {
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

  try {
    const updatedBookId = await axios.put(
      `/book/${bookId}`,
      data,
      AXIOS_REQUEST_CONFIG
    );

    const updatedBook = await axios.get(`/book/${updatedBookId}`);

    if (!updatedBook.data) return false;

    dispatch({
      type: EDIT_BOOK,
      payload: updatedBook.data,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
