import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  User,
  Tag,
  Copy,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  AlertTriangle,
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
import { useGetBookByIdQuery, useDeleteBookMutation } from "@/redux/api";
import { toast } from "react-toastify";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: bookData,
    isLoading,
    error,
  } = useGetBookByIdQuery(id!, {
    skip: !id,
  });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const book = bookData?.data;

  const handleDelete = async () => {
    if (!book) return;
    try {
      await deleteBook(book._id).unwrap();
      toast.success(`"${book.title}" was deleted successfully.`);
      navigate("/books");
    } catch (err) {
      toast.error("Failed to delete the book.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Book Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The book you're looking for could not be found.
            </p>
            <Button
              onClick={() => navigate("/books")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAvailable = book.copies > 0;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-6">
        
          {/* <Link > */}
          <Button
            variant="ghost"
            onClick={() => navigate("/books")}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            
            <ArrowLeft className="w-4 h-4" />
            Back to All Books
            </Button>
            

            
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left side - Cover and Title */}
            <div className="md:col-span-1 p-8 bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center text-center">
              <div className="p-6 rounded-lg bg-background shadow-sm mb-4">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">{book.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">by {book.author}</p>
              <div className="mt-4">
                {isAvailable ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Right side - Details and Actions */}
            <div className="md:col-span-2 p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Book Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Tag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Genre</p>
                    <p className="text-lg font-semibold text-foreground">{book.genre}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Copy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Copies</p>
                    <p className="text-lg font-semibold text-foreground">{book.copies}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Author</p>
                    <p className="text-lg font-semibold text-foreground">{book.author}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date Added</p>
                    <p className="text-lg font-semibold text-foreground">
                      {new Date(book.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {book.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
                  <p className="text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-md">
                    {book.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  disabled={!isAvailable}
                  onClick={() => navigate(`/borrow/${book._id}`)}
                >
                  <BookOpen className="w-5 h-5" />
                  Borrow Book
                </Button>
                <Link to={`/edit-book/${book._id}`} className="flex-1">
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Edit className="w-5 h-5" />
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 gap-2 text-destructive hover:text-destructive border-destructive/50 hover:border-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="pt-2">
                        Are you sure you want to delete "{book.title}"? This action is permanent and cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete} 
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete Book"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}