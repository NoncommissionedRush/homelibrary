import { supabase } from "../../config.js";
import addNewAuthorToDatabase from "./addAuthorToDb.js";
import addTagToBook from "./addTagToBook.js";
import { clearCache } from "../../services/pgCache.js";
import { getBooksQueryString } from "./getBooks.js";

/** add new book to database
 * @return {Object} new book object
 */
const createBook = async (req, res) => {
  let { title, author, note, read, tag } = req.body;
  let authorId;
  title = title.trim();
  author = author.trim();

  if (!title) {
    return res.send({
      errorMessage: "Title can not be empty",
    });
  }

  if (!author) {
    author = "Neznámy autor";
  }

  try {
    const { data: existingAuthor, error: selectError } = await supabase
      .from('author')
      .select('id')
      .eq('name', author)
      .single()

    if(selectError && selectError.code !== 'PGRST116') {
      // handle errors other than "no rows found"
      console.log(selectError)
      return res.status(500).send({errorMessage: "Error checking author"})
    }

    if (existingAuthor) {
      authorId = parseInt(existingAuthor.id);
    } else {
      authorId = await addNewAuthorToDatabase(author);
    }

    let { data: newBook, error: insertError } = await supabase
      .from('book')
      .insert([{title, author_id: authorId, note, read}])
      .select('id')
      .single()

    if(insertError){
      console.log(insertError)
      return res.status(500).send({errorMessage: "Error inserting book"})
    }

    await addTagToBook(tag, newBook.id);

    res.send(newBook.id.toString());
    clearCache(getBooksQueryString);
  } catch (error) {
    console.log(error);
    res.status(500).send({errorMessage: "Internal server error"})
  }
};

export default createBook;
