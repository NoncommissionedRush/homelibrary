import pool from "../../config.js";
import createTag from "./createTag.js";

export const addTagToBookRequestHandler = async (req, res) => {
  const bookId = req.params.bookId;
  const { tagName } = req.body;

  const result = await addTagToBook(tagName, bookId);

  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const addTagToBook = async (tagName, bookId) => {
  if (typeof tagName !== "string" || tagName.length < 1) return false;

  try {
    const existingTag = await pool.query("SELECT * FROM tag WHERE tag = $1", [
      tagName,
    ]);

    let tagId;

    // if the tag exists add existing else create a new one
    if (existingTag.rows[0] != undefined) {
      tagId = existingTag.rows[0].id;
    } else {
      const newTagId = await createTag(tagName);
      tagId = newTagId;
    }

    await pool.query(
      "INSERT INTO book_tag (book_id, tag_id) VALUES ($1, $2) RETURNING *",
      [bookId, tagId]
    );

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default addTagToBook;
