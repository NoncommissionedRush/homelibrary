import { supabase } from "../../config.js";
import deleteOrphanTags from "./deleteOrphanTags.js";

export const removeTagFromBookRequestHandler = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { tagName } = req.body;

  if (isNaN(bookId) || typeof tagName !== "string") return res.send(false);

  try {
    const result = await removeTagFromBook(tagName, bookId);

    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const removeTagFromBook = async (tagName, bookId) => {
  if (typeof bookId !== "number") return false;
  try {
    const { data: existingTag, error: selectError } = await supabase
      .from('tag')
      .select('*')
      .eq('tag', tagName)
      .single()

    if(selectError || !existingTag) return false;

    const { error: deleteError, count } = await supabase
      .from('book_tag')
      .delete()
      .eq('book_id', bookId)
      .eq('tag_id', existingTag.id)

    if(deleteError || count === 0) {
      return false;
    }

    await deleteOrphanTags();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default removeTagFromBook;
