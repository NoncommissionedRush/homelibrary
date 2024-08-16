import Query from '../../services/pgCache.js';
import { SupabaseViews } from '../../client/src/supabase-views.enum.js';

/** returns all books from the database */
const getBooks = async (_, res) => {
    try {
        const response = await Query(SupabaseViews.GET_BOOKS, 120);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

export default getBooks;
