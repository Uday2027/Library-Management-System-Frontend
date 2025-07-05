import Root from "@/layouts/Root";
import BookDetails from "@/pages/BookDetails";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:bookId",
        element: <BorrowBook />,
      },
    ],
  },
]);
