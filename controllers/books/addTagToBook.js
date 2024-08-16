import { supabase } from "../../config.js";
import createTag from "./createTag.js";

export const addTagToBookRequestHandler = async (req, res) => {
  const bookId = req.params.bookId;
  const { tagName } = req.body;

  const result = await addTagToBook(tagName, bookId);

  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const addTagToBook = async (tagName, bookId) => {
  if (typeof tagName !== "string" || tagName.length < 1) return false;

  try {
    let { data: existingTag, error: selectError } = await supabase.from('tag').select('*').eq('tag', tagName).single();

    if(selectError && selectError.code !== 'PGRST116') {
      // handle errors other that "no rows found"
      console.log(selectError)
      return false;
    }

    let tagId;

    if (existingTag) {
      tagId = existingTag.id;
    } else {
      const newTagId = await createTag(tagName);
      tagId = newTagId;
    }

    const { error: insertError } = await supabase.from('book_tag').insert([{book_id: bookId, tag_id: tagId }])

    if(insertError) {
      console.log(insertError)
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default addTagToBook;
