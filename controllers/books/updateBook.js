import { supabase } from '../../config.js';
import addNewAuthorToDatabase from './addAuthorToDb.js';
import { clearCache } from '../../services/pgCache.js';
import { SupabaseViews } from '../../client/src/supabase-views.enum.js';

/** update existing book
 * @return {Integer} updated book's id
 */
const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    let { title, author, note, read } = req.body;
    let authorId;

    if (!read) read = 0;

    try {
        const { data: existingAuthor, error: selectError } = await supabase
            .from('author')
            .select('id')
            .eq('name', author)
            .single();

        if (selectError && selectError.code !== 'PGRST116') {
            console.log(selectError);
            return res
                .status(500)
                .send({ errorMessage: 'Error checking author' });
        }

        if (existingAuthor) {
            authorId = parseInt(existingAuthor.id);
        } else {
            authorId = await addNewAuthorToDatabase(author);
        }

        const { data: updatedBook, error: updateError } = await supabase
            .from('book')
            .update({ title, author_id: authorId, note, read })
            .eq('id', bookId)
            .select('id')
            .single();

        if (updateError) {
            console.log(updateError);
            return res
                .status(500)
                .send({ errorMessage: 'Error updating book' });
        }

        const updatedBookId = updatedBook.id;

        res.send(updatedBookId.toString());

        clearCache(SupabaseViews.GET_BOOKS);
    } catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: 'Internal server error' });
    }
};

export default updateBook;
