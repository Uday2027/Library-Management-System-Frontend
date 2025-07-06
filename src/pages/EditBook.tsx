import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpenCheck,
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { Genre} from "@/types/book";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading: isFetching } = useGetBookByIdQuery(id!, { skip: !id });
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    if (bookData?.data) {
      const book = bookData.data;
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSelectChange = (value: string) => {
    setForm({ ...form, genre: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateBook({ id, body: { ...form, genre: form.genre as Genre, copies: Number(form.copies) } }).unwrap();
      toast.success("Book details updated successfully!");
      navigate(`/books/${id}`);
    } catch (err) {
      toast.error("Failed to update the book.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!bookData?.data) {
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
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/books/${id}`)}
            className="border-gray-300 hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel Edit
          </Button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BookOpenCheck className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Edit Book</h1>
              <p className="text-gray-500">Update the details for "{form.title}".</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields are identical to CreateBook, pre-filled with data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <Input name="author" value={form.author} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <Select onValueChange={handleSelectChange} value={form.genre}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map((g) => (
                      <SelectItem key={g} value={g}>{g.replace("_", " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copies</label>
                <Input name="copies" type="number" min={0} value={form.copies} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <Input name="isbn" value={form.isbn} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea name="description" value={form.description} onChange={handleChange} rows={4} />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button type="submit" disabled={isUpdating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 shadow-sm hover:shadow-md transition-all">
                {isUpdating ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                {isUpdating ? "Saving Changes..." : "Update Book"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
