import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Library, BookOpen, Plus, FileText } from "lucide-react";

const links = [
  { to: "/", label: "Library", icon: BookOpen },
  { to: "/create-book", label: "Add Book", icon: Plus },
  { to: "/borrow-summary", label: "Summary", icon: FileText },
];

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Library className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              LibrarySys
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"} // Ensure "Books" is only active on the exact path
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )
                }
              >
                <link.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
