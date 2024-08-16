import { supabase } from "../../config";
import bcrypt from "bcrypt";

/** register new user
 * @return {Object} user object
 */
const register = async (req, res) => {
  const { name, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{name, password: hashedPassword }])
      .select('id')
      .single()

    if(error) {
      throw error;
    }

    req.session.userId = newUser.id;
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({errorMessage: "Internal server error"})
  }
};

export default register;
