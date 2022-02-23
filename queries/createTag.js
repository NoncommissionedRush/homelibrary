import pool from "../config.js";

const addNewTagtoDb = async (tagName) => {
  try {
    const result = await pool.query(
      "INSERT INTO tag (tag) VALUES ($1) RETURNING id",
      [tagName]
    );

    return result.rows[0].id;
  } catch (error) {
    console.log(error);
  }
};

export default addNewTagtoDb;
