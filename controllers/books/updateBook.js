import pool from "../../config.js";
import addNewAuthorToDatabase from "./addAuthorToDb.js";

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
    const existingAuthor = await pool.query(
      "SELECT id FROM author WHERE name = $1",
      [author]
    );

    if (existingAuthor.rows[0] != undefined) {
      authorId = parseInt(existingAuthor.rows[0].id);
    } else {
      authorId = await addNewAuthorToDatabase(author);
    }

    const updatedBook = await pool.query(
      "UPDATE book SET title = $1, author_id = $2, note = $3, read = $4 WHERE id = $5 RETURNING id",
      [title, authorId, note, read, bookId]
    );

    const updatedBookId = updatedBook.rows[0].id;

    res.send(updatedBookId.toString());
  } catch (error) {
    console.log(error);
  }
};

export default updateBook;
