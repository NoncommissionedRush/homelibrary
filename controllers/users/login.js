import getUserByName from "./getUserByName.js";
import bcrypt from "bcrypt";

/** login user and save userId to session
 * @return {Object} user object
 */
const login = async (req, res) => {
  const { name, password } = req.body;

  if (name.trim().length === 0) {
    return res.send({
      errorMessage: "Meno musí byť veď",
    });
  }

  if (password.trim().length === 0) {
    return res.send({
      errorMessage: "A heslo čo? Nič?",
    });
  }

  try {
    const existingUser = await getUserByName(name);

    if (!existingUser) {
      return res.send({
        errorMessage: "Nesprávne meno alebo heslo",
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.send({
        errorMessage: "Nesprávne meno alebo heslo",
      });
    }

    req.session.userId = existingUser.id;
    res.status(200).send(existingUser);
  } catch (error) {
    console.log(error);
  }
};

export default login;
