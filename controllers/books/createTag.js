import { supabase } from '../../config.js';

const addNewTagtoDb = async tagName => {
    try {
        const { data: newTag, error } = await supabase
            .from('tag')
            .insert([{ tag: tagName }])
            .select('id')
            .single();

        if (error) {
            throw error;
        }

        return newTag.id;
    } catch (error) {
        console.log(error);
    }
};

export default addNewTagtoDb;
