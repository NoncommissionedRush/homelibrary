import express from "express";
import getBooks from "../queries/getBooks.js";
import createBook from "../queries/createBook.js";
import updateBook from "../queries/updateBook.js";
import deleteBook from "../queries/deleteBook.js";
import { addTagToBookRequestHandler } from "../queries/addTagToBook.js";
import { removeTagFromBookRequestHandler } from "../queries/removeTagFromBook.js";
import { login, logout, me, register } from "../users.js";
const router = express.Router();

//@route  GET /books
//@desc get all books from database
router.get("/books", getBooks);

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

// sql query to get books with tags
// SELECT book.id, book.title, array_agg(tag.tag)
// FROM book
// FULL JOIN book_tag bt
// ON bt.book_id = book.id
// FULL JOIN tag
// ON tag.id = bt.tag_id
// GROUP BY book.id;

// sql query to delete orphans from tag table
// DELETE FROM tag
// USING tag as t
// LEFT JOIN book_tag bt
// ON bt.tag_id = t.id
// WHERE tag.id = t.id
// AND bt.tag_id IS NULL;
