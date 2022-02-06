import express from "express";
import { createBook, deleteBook, getBooks, updateBook } from "../queries.js";
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

export default router;
