import db from "../config/db";
import type { Author, Book } from "../models/models";

export async function getAllAuthors(): Promise<Author[]> {
  const result = await db.query<Author>(
    `
    SELECT * FROM authors;
    `
  );

  return result.rows;
}

export async function getAuthorById(authorId: string): Promise<Author | null> {
  const result = await db.query<Author>(
    `
    SELECT * FROM authors
    WHERE authors.id = $1;
    `,
    [authorId]
  );

  return result.rows[0] || null;
}

export async function getAllBooks(): Promise<Book[]> {
  const result = await db.query<Book>(
    `
    SELECT * FROM books;`
  );

  return result.rows;
}

export async function getBooksById(bookId: string): Promise<Book | null> {
  const result = await db.query<Book>(
    `
    SELECT * FROM books
    WHERE books.id = $1;
    `,
    [bookId]
  );

  return result.rows[0] || null;
}

export async function getAllBooksByAuthor(authorId: string): Promise<Book[]> {
  const result = await db.query<Book>(
    `
    SELECT * FROM books
    INNER JOIN book_authors
    ON books.id = book_authors.bookId
    WHERE book_authors.authorId = $1
    `,
    [authorId]
  );

  return result.rows;
}

export async function getAllAuthorsofBook(bookId: string): Promise<Author[]> {
  const result = await db.query<Author>(
    `
    SELECT * FROM authors
    INNER JOIN book_authors
    ON authors.id = book_authors.authorId
    WHERE book_authors.bookId = $1
    `,
    [bookId]
  );

  return result.rows;
}

export async function createBookWithAuthors(
  title: string,
  publishedAt: Date,
  authorIds: string[]
) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const insertBook = `INSERT INTO books (title, publishedAt) VALUES ($1, $2) RETURNING id`;
    const res = await client.query(insertBook, [title, publishedAt]);

    const bookId = res.rows[0].id;

    const insertBookAuthorQuery = `INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)`;
    for (const authorId of authorIds) {
      await client.query(insertBookAuthorQuery, [bookId, authorId]);
    }

    await client.query("COMMIT");
    return bookId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
