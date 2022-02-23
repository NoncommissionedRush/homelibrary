import pool from "../config.js";
import deleteOrphanTags from "./deleteOrphanTags.js";

/** delete book from database
 * @return {Boolean}
 */
const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.send(false);
  }
  try {
    // delete book from db
    await pool.query("DELETE FROM book WHERE id = $1", [bookId]);
    // delete orphan tags if there are any
    await deleteOrphanTags();
    res.send(true);
  } catch (error) {
    console.log(error);
  }
};

export default deleteBook;
