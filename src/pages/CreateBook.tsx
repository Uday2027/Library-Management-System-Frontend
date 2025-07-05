import { useCreateBookMutation } from "@/redux/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookPlus, ArrowLeft, Save, Loader2 } from "lucide-react";
import type { Genre } from "@/types/book";
import { toast } from "react-toastify";

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, genre: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook({
        ...form,
        genre: form.genre as Genre,
        copies: Number(form.copies),
        available: true,
      }).unwrap();
      toast.success("New book added to the library!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add the book. Please check the details.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-gray-300 hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-full">
              <BookPlus className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add a New Book</h1>
              <p className="text-gray-500">Fill in the details to expand the collection.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Input name="title" placeholder="e.g., The Great Gatsby" value={form.title} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <Input name="author" placeholder="e.g., F. Scott Fitzgerald" value={form.author} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <Select onValueChange={handleSelectChange} defaultValue={form.genre}>
                  <SelectTrigger><SelectValue placeholder="Select Genre" /></SelectTrigger>
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
              <Input name="isbn" placeholder="Enter 13-digit ISBN" value={form.isbn} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea name="description" placeholder="A brief summary of the book..." value={form.description} onChange={handleChange} rows={4} />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 shadow-sm hover:shadow-md transition-all">
                {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                {isLoading ? "Saving..." : "Save Book"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
