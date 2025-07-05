import type { IBook } from "./book";

export interface IBorrow {
  _id: string;
  book: string | IBook;
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrowFormInput {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
    author: string;
  };
  totalQuantity: number;
}
