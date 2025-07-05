import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Edit,
  BookOpen,
  User,
  Tag,
  CheckCircle,
  XCircle,
  Trash2,
  MoreVertical,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IBook } from "@/types/book";
import { useDeleteBookMutation } from "@/redux/api";
import { toast } from "react-toastify";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();

  const isAvailable = book.copies > 0;

  const handleDelete = async () => {
    try {
      await deleteBook(book._id).unwrap();
      toast.success(`"${book.title}" was deleted.`);
    } catch (error) {
      toast.error("Failed to delete the book.");
    }
  };

  return (
    <Card className="group relative bg-white border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg overflow-hidden">
      {/* Book Cover Area */}
      {/* <Link to={`/books/${book._id}`} className="block">
        <div className="w-full h-48 bg-indigo-50 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-indigo-200" />
        </div>
      </Link> */}

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 font-medium truncate">{book.genre}</span>
            </div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                {book.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <User className="w-4 h-4" />
              <span className="text-sm truncate">{book.author}</span>
            </div>
          </div>
          
          {/* More Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 rounded-full">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => navigate(`/edit-book/${book._id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:bg-red-50 focus:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{book.title}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin"/> : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status and Action */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            {isAvailable ? (
              <div className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                {book.copies} available
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sm text-red-700 font-medium">
                <XCircle className="w-4 h-4" />
                Out of stock
              </div>
            )}
          </div>
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm disabled:bg-gray-300"
            disabled={!isAvailable}
            onClick={() => navigate(`/borrow/${book._id}`)}
          >
            Borrow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
