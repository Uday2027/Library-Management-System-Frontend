import { useGetBorrowSummaryQuery } from "@/redux/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  BookOpen,
  Hash,
  TrendingUp,
  Library,
  Loader2,
  SearchX,
} from "lucide-react";
import type { IBorrowSummaryItem } from "@/types/borrow";

export default function BorrowSummary() {
  const { data: borrowSummaryData, isLoading } = useGetBorrowSummaryQuery();
  const summary = borrowSummaryData?.data;

  const totalBorrowedBooks = summary?.reduce((sum: number, item: IBorrowSummaryItem) => sum + item.totalQuantity, 0) || 0;
  const uniqueBooksBorrowed = summary?.length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Borrow Summary</h1>
            <p className="text-gray-500 mt-2 text-lg">An overview of all borrowing activity.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg"><Library className="w-6 h-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-600">Unique Books Borrowed</p>
                <p className="text-2xl font-bold text-gray-800">{uniqueBooksBorrowed}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg"><TrendingUp className="w-6 h-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-600">Total Copies Borrowed</p>
                <p className="text-2xl font-bold text-gray-800">{totalBorrowedBooks}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg"><Hash className="w-6 h-6 text-purple-600" /></div>
              <div>
                <p className="text-sm text-gray-600">Avg. Borrows per Book</p>
                <p className="text-2xl font-bold text-gray-800">
                  {uniqueBooksBorrowed > 0 ? (totalBorrowedBooks / uniqueBooksBorrowed).toFixed(1) : "0.0"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Table */}
        <Card className="bg-white shadow-lg border-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Detailed Report</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {uniqueBooksBorrowed === 0 ? (
              <div className="text-center py-20">
                <SearchX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No Borrowing Activity</h3>
                <p className="text-gray-500 mt-2">When books are borrowed, they will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3"><div className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Book Title</div></th>
                      <th scope="col" className="px-6 py-3"><div className="flex items-center gap-2"><Hash className="w-4 h-4" />ISBN</div></th>
                      <th scope="col" className="px-6 py-3"><div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" />Total Borrowed</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary?.map((item: IBorrowSummaryItem, idx: number) => (
                      <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.book.title}</th>
                        <td className="px-6 py-4 font-mono">{item.book.isbn}</td>
                        <td className="px-6 py-4 font-semibold text-gray-800">{item.totalQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
