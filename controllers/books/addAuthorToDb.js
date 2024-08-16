import { supabase } from '../../config.js';

/** adds a new author to dtabase
 * @param   {String}  name  author's name
 * @return  {Integer}       new author's id
 */
const addNewAuthorToDatabase = async name => {
    try {
        const { data, error } = await supabase
            .from('author')
            .insert([{ name }])
            .select('id')
            .single();

        if (error) throw error;

        return data.id;
    } catch (error) {
        console.log(error);
    }
};

export default addNewAuthorToDatabase;
