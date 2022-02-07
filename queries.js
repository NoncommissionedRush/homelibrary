import pool from "./config.js";

/** returns all books from the database */
export const getBooks = (req, res) => {
  pool.query(
    "SELECT book.id, book.title, book.note, book.read, author.name as author FROM book INNER JOIN author ON book.author_id=author.id ORDER BY id",
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).json(result.rows);
    }
  );
};

/** adds a new author to dtabase
 * @param   {String}  name  author's name
 * @return  {Integer}       new author's id
 */
const addNewAuthorToDatabase = async (name) => {
  try {
    const result = await pool.query(
      "INSERT INTO author (name) VALUES ($1) RETURNING id",
      [name]
    );

    return result.rows[0].id;
  } catch (error) {
    console.log(error);
  }
};

/** add new book to database
 * @return {Object} new book object
 */
export const createBook = async (req, res) => {
  let { title, author, note, read } = req.body;
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

    res.status(200).send(newBookEntry.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

// --------------------------- UPDATE ------------------------
/** update existing book
 * @return {Integer} updated book's id
 */
export const updateBook = async (req, res) => {
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
      "UPDATE book SET title = $1, author_id = $2, note = $3, read = $4 WHERE id = $5",
      [title, authorId, note, read, bookId]
    );

    res.status(200).send(updatedBook.id);
  } catch (error) {
    console.log(error);
  }
};

// ------------------------ DELETE -------------------------
/** delete book from database
 * @return {Boolean}
 */
export const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  pool.query("DELETE FROM book WHERE id = $1", [bookId], (error, result) => {
    if (error) {
      throw error;
    }

    res.send(true);
  });
};
