import { supabase } from '../../config.js';

const deleteOrphanTags = async () => {
    try {
        const { error } = await supabase
            .from('tag')
            .delete()
            .using('tag')
            .leftJoin('book_tag', 'book_tag.tag_id', 'tag.id')
            .is('book_tag.tag_id', null);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.log(error);
    }
};

export default deleteOrphanTags;
