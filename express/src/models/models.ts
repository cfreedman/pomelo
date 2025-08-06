export interface Book {
  id: string;
  title: string;
  publishedAt: Date;
}

export interface Author {
  id: string;
  name: string;
}

export interface BookAuthor {
  bookId: string;
  authorId: string;
}
