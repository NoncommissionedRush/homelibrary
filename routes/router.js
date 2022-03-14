import express from "express";
// books
import getBooks from "../controllers/books/getBooks.js";
import { addTagToBookRequestHandler } from "../controllers/books/addTagToBook.js";
import createBook from "../controllers/books/createBook.js";
import deleteBook from "../controllers/books/deleteBook.js";
import getBook from "../controllers/books/getBook.js";
import { removeTagFromBookRequestHandler } from "../controllers/books/removeTagFromBook.js";
import updateBook from "../controllers/books/updateBook.js";
// users
import login from "../controllers/users/login.js";
import logout from "../controllers/users/logout.js";
import register from "../controllers/users/register.js";
import me from "../controllers/users/me.js";

const router = express.Router();

//@route  GET /books
//@desc get all books from database
router.get("/books", getBooks);

//@route  GET /book/id
//@desc get book by id
router.get("/book/:id", getBook);

//@route  POST /book
//@desc create new book
router.post("/book", createBook);

//@route  PUT /book/id
//@desc update book
router.put("/book/:id", updateBook);

//@route  DELETE /book/id
//@desc delete book
router.delete("/book/:id", deleteBook);

//@route  GET /register
//@desc register new user
router.get("/register", register);

//@route  GET /login
//@desc login user
router.post("/login", login);

//@route  GET /logout
//@desc logout user
router.get("/logout", logout);

//@route  GET /me
//@desc return current user object
router.get("/me", me);

//@route  POST /book_tag/:bookId
//@desc add tag to book
router.post("/book_tag/:bookId", addTagToBookRequestHandler);

//@route  DELETE /book_tag/:bookId
//@desc add tag to book
router.delete("/book_tag/:bookId", removeTagFromBookRequestHandler);

export default router;
