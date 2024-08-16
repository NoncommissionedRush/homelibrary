import { supabase } from "../../config";

/** find user by name
 * @param   {String}  name  user's name
 * @return  {Object}  user object
 */
const getUserByName = async (name) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single()

    if(error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

export default getUserByName;
