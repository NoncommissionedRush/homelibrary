import pool from "../../config.js";
import addNewAuthorToDatabase from "./addAuthorToDb.js";
import { clearCache } from "../../services/pgCache.js";
import { getBooksQueryString } from "./getBooks.js";

/** update existing book
 * @return {Integer} updated book's id
 */
const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  let { title, author, note, read } = req.body;
  let authorId;

  if (read === undefined) {
    read = 0;
  }

  try {
    const {
      rows: [existingAuthor],
    } = await pool.query("SELECT id FROM author WHERE name = $1", [author]);

    if (existingAuthor != undefined) {
      authorId = parseInt(existingAuthor.id);
    } else {
      authorId = await addNewAuthorToDatabase(author);
    }

    const {
      rows: [updatedBook],
    } = await pool.query(
      "UPDATE book SET title = $1, author_id = $2, note = $3, read = $4 WHERE id = $5 RETURNING id",
      [title, authorId, note, read, bookId]
    );
    const updatedBookId = updatedBook.id;

    res.send(updatedBookId.toString());
    clearCache(getBooksQueryString);
  } catch (error) {
    console.log(error);
  }
};

export default updateBook;
