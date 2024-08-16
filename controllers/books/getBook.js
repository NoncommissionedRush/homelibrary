import { supabase } from '../../config.js';
import { SupabaseFunctions } from '../../client/src/supabase-functions.js';

/** returns all books from the database */
const getBook = async (req, res) => {
    const bookId = parseInt(req.params.id);

    try {
        const { data: books, error } = await supabase.rpc(
            SupabaseFunctions.GET_BOOK,
            { book_id: bookId },
        );

        if (error) {
            throw error;
        }

        const book = books[0];

        res.send(book);
    } catch (error) {
        console.log(error);
    }
};

export default getBook;
