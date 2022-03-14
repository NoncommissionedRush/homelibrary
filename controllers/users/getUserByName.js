import pool from "../../config.js";

/** find user by name
 * @param   {String}  name  user's name
 * @return  {Object}  user object
 */
const getUserByName = async (name) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export default getUserByName;
