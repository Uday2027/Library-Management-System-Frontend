import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation, useGetBookByIdQuery } from "@/redux/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Hash,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: bookData, isLoading: isFetching } = useGetBookByIdQuery(bookId!, { skip: !bookId });
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  
  const book = bookData?.data;

  const [form, setForm] = useState({ quantity: 1, dueDate: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !book) return;
    if (form.quantity > book.copies) {
        toast.error("Cannot borrow more copies than are available.");
        return;
    }
    try {
        await borrowBook({
            book: bookId,
            quantity: Number(form.quantity),
            dueDate: form.dueDate,
        }).unwrap();
        toast.success(`You've borrowed "${book.title}"!`);
        navigate("/borrow-summary");
    } catch (err) {
        toast.error("Failed to borrow the book.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>
        <Button onClick={() => navigate("/")} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
            <Button variant="outline" onClick={() => navigate(`/books/${bookId}`)} className="border-gray-300 hover:bg-gray-100 text-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book Details
            </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side: Book Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-lg text-gray-500 mb-6">by {book.author}</p>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span><span className="font-bold">{book.copies}</span> copies available</span>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 p-4 rounded-lg">
                    <p className="font-semibold">Borrowing Policy</p>
                    <p className="text-sm mt-1">Please Return the book on time otherwise police will arrest you</p>
                </div>
            </div>
          </div>

          {/* Right Side: Borrow Form */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Borrow This Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <Input
                    name="quantity"
                    type="number"
                    min={1}
                    max={book.copies}
                    value={form.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Due Date</label>
                  <Input
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isBorrowing || !form.dueDate || form.quantity < 1}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 shadow-sm hover:shadow-md transition-all"
                >
                  {isBorrowing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                  {isBorrowing ? "Processing..." : "Confirm Borrow"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
