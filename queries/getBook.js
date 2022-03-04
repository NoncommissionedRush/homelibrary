import pool from "../config.js";

/** returns all books from the database */
const getBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const result = await pool.query(
      `
      SELECT book.id, book.title, book.note, book.read, author.name as author, book.tags 
    FROM (
      SELECT book.id, book.title, book.note, book.read, book.author_id, array_agg(tag.tag) as tags
      FROM book
      FULL JOIN book_tag bt
      ON bt.book_id = book.id
      FULL JOIN tag
      ON tag.id = bt.tag_id
      GROUP BY book.id
    ) book 
    INNER JOIN author 
    ON book.author_id=author.id 
    WHERE book.id = $1
       `,
      [bookId]
    );

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export default getBook;
