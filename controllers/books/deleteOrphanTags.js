import pool from "../../config.js";

const deleteOrphanTags = async () => {
  try {
    await pool.query(
      "DELETE FROM tag USING tag AS t LEFT JOIN book_tag bt ON bt.tag_id = t.id WHERE tag.id = t.id AND bt.tag_id IS NULL"
    );
  } catch (error) {
    console.log(error);
  }
};

export default deleteOrphanTags;
