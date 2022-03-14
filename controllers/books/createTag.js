import pool from "../../config.js";

const addNewTagtoDb = async (tagName) => {
  try {
    const {
      rows: [newTag],
    } = await pool.query("INSERT INTO tag (tag) VALUES ($1) RETURNING id", [
      tagName,
    ]);

    return newTag.id;
  } catch (error) {
    console.log(error);
  }
};

export default addNewTagtoDb;
