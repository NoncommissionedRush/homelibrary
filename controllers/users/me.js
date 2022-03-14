import pool from "../../config.js";

/** return user if there is userId in session
 * @return {Object} user
 */
const me = async (req, res) => {
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

export default me;
