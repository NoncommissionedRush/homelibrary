import pool from "../../config.js";
import bcrypt from "bcrypt";

/** register new user
 * @return {Object} user object
 */
const register = async (req, res) => {
  const { name, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const {
      rows: [newUser],
    } = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id",
      [name, hashedPassword]
    );

    req.session.userId = newUser.id;
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
  }
};

export default register;
