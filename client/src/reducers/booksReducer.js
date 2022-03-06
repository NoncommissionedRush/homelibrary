import {
  ADD_BOOK,
  ADD_TAG,
  DELETE_BOOK,
  DELETE_TAG,
  EDIT_BOOK,
  GET_BOOKS,
  SET_FILTER,
} from "../actions/types";

const initialState = {
  books: [],
  filter: {
    string: "",
    readIndex: 0,
    tags: [],
  },
};

/**
 * @param {book[]} books
 * @param {Object} filter
 * @returns new array of books
 */
export const filterBooks = (books, filter) => {
  const filterString = filter.string.toLowerCase();
  return books
    .filter(
      (book) =>
        book.author.toLowerCase().includes(filterString) ||
        book.title.toLowerCase().includes(filterString) ||
        (book.note && book.note.toLowerCase().includes(filterString))
    )
    .filter((book) => {
      switch (filter.readIndex) {
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
      if (filter.tags.length === 0) return book;
      return filter.tags.every((tag) => book.tags.includes(tag));
    });
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
    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: Object.assign(state.filter, action.payload),
      };
    case ADD_TAG:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case DELETE_TAG:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    default:
      return state;
  }
};

export default booksReducer;
