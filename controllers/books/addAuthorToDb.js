import pool from "../../config.js";

/** adds a new author to dtabase
 * @param   {String}  name  author's name
 * @return  {Integer}       new author's id
 */
const addNewAuthorToDatabase = async (name) => {
  try {
    const {
      rows: [newAuthor],
    } = await pool.query("INSERT INTO author (name) VALUES ($1) RETURNING id", [
      name,
    ]);

    return newAuthor.id;
  } catch (error) {
    console.log(error);
  }
};

export default addNewAuthorToDatabase;
