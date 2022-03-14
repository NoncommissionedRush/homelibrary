import pool from "../../config.js";
import addNewAuthorToDatabase from "./addAuthorToDb.js";
import addTagToBook from "./addTagToBook.js";

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
    const existingAuthor = await pool.query(
      "SELECT id FROM author WHERE name = $1",
      [author]
    );

    if (existingAuthor.rows[0] != undefined) {
      authorId = parseInt(existingAuthor.rows[0].id);
    } else {
      authorId = await addNewAuthorToDatabase(author);
    }

    const newBookEntry = await pool.query(
      "INSERT INTO book (title, author_id, note, read) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, authorId, note, read]
    );

    const newBookId = newBookEntry.rows[0].id;

    await addTagToBook(tag, newBookId);

    res.send(newBookId.toString());
  } catch (error) {
    console.log(error);
  }
};

export default createBook;
