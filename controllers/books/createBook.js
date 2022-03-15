import pool from "../../config.js";
import addNewAuthorToDatabase from "./addAuthorToDb.js";
import addTagToBook from "./addTagToBook.js";
import { clearCache } from "../../services/pgCache.js";
import { getBooksQueryString } from "./getBooks.js";

/** add new book to database
 * @return {Object} new book object
 */
const createBook = async (req, res) => {
  let { title, author, note, read, tag } = req.body;
  let authorId;
  title = title.trim();
  author = author.trim();

  if (!title) {
    return res.send({
      errorMessage: "Title can not be empty",
    });
  }

  if (!author) {
    author = "Neznámy autor";
  }

  try {
    const {
      rows: [existingAuthor],
    } = await pool.query("SELECT id FROM author WHERE name = $1", [author]);

    if (existingAuthor) {
      authorId = parseInt(existingAuthor.id);
    } else {
      authorId = await addNewAuthorToDatabase(author);
    }

    const {
      rows: [newBook],
    } = await pool.query(
      "INSERT INTO book (title, author_id, note, read) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, authorId, note, read]
    );

    await addTagToBook(tag, newBook.id);

    res.send(newBook.id.toString());
    clearCache(getBooksQueryString);
  } catch (error) {
    console.log(error);
  }
};

export default createBook;
