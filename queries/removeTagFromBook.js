import pool from "../config.js";
import deleteOrphanTags from "./deleteOrphanTags.js";

export const removeTagFromBookRequestHandler = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { tagName } = req.body;

  if (isNaN(bookId) || typeof tagName !== "string") return res.send(false);

  try {
    const result = await removeTagFromBook(tagName, bookId);

    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const removeTagFromBook = async (tagName, bookId) => {
  if (typeof bookId !== "number") return false;
  try {
    const queryResult = await pool.query("SELECT * FROM tag WHERE tag = $1", [
      tagName,
    ]);

    const existingTag = queryResult.rows[0];

    // if the tag does not exist return false
    if (existingTag === undefined) return false;

    const result = await pool.query(
      "DELETE FROM book_tag WHERE book_id = $1 AND tag_id = $2",
      [bookId, existingTag.id]
    );

    // if nothing was deleted, ie. bookId does not exist, return false
    if (result.rowCount === 0) {
      return false;
    }

    await deleteOrphanTags();

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default removeTagFromBook;
