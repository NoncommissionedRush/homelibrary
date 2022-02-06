import pool from "./config.js";
import bcrypt from "bcrypt";

// ------------------------- USERS ---------------------------
/** register new user
 * @return {Object} user object
 */
export const register = async (req, res) => {
  const { name, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id",
      [name, hashedPassword]
    );

    req.session.userId = result.rows[0].id;
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

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

/** login user and save userId to session
 * @return {Object} user object
 */
export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await getUserByName(name);

    if (!existingUser) {
      return res.send(undefined);
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.send(undefined);
    }

    req.session.userId = existingUser.id;
    res.status(200).send(existingUser);
  } catch (error) {
    console.log(error);
  }
};

/** logout user and destroy session
 * @return {Boolean}
 */
export const logout = async (req, res) => {
  new Promise((resolve) => {
    req.session.destroy((err) => {
      if (err) {
        resolve(false);
      }
      res.clearCookie("qid");
      resolve(true);
    });
  }).then((result) => {
    res.send(result);
  });
};

/** return user if there is userId in session
 * @return {Object} user
 */
export const me = async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [
        req.session.userId,
      ]);
      res.status(200).send(user.rows[0]);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(undefined);
  }
};
