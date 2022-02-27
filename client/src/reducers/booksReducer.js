import {
  SET_FILTER,
  GET_BOOKS,
  SET_READ_INDEX,
  ADD_BOOK,
} from "../actions/types";

const initialState = {
  books: [],
  filter: "",
  readIndex: 0,
};

export const filterBooks = (books, filter, readIndex) => {
  return books
    .filter(
      (book) =>
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.title.toLowerCase().includes(filter.toLowerCase())
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
    });
  // .filter((book) => {
  //   if (tags.length === 0) return book;
  //   return tags.every((tag) => book.tags.includes(tag));
  // });
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload].sort((a, b) =>
          a.title.localeCompare(b.title, "en", { sensitivity: "base" })
        ),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_READ_INDEX:
      return {
        ...state,
        readIndex: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
