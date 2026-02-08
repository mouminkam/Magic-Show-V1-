import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-200">
      {/* Pagination */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 bg-gray-800 text-white rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400 hover:shadow-md"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 bg-gray-800 text-white rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
