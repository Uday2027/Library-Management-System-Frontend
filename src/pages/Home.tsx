import { useGetBooksQuery } from "@/redux/api";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Library, SearchX } from "lucide-react";
import type { IBook } from "@/types/book";

// Skeleton component for loading state
const BookCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const { data: books, isLoading } = useGetBooksQuery();

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Library className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                All Books
              </h1>
              <p className="text-gray-500">
                Read More, Learn More, Be Kind, Be a Human
              </p>
            </div>
          </div>
          <Link to="/create-book">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
              <Plus className="w-5 h-5 mr-2" />
              Add New Book
            </Button>
          </Link>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {books?.data?.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-lg shadow-sm">
                <SearchX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Your Library is Empty
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  It looks like there are no books here yet. Get started by adding one.
                </p>
                <Link to="/create-book">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Book
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books?.data?.map((book: IBook) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
