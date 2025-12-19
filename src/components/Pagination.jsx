export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const displayMax = Math.max(1, totalPages);

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 pb-10">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage((p) => Math.min(displayMax, p + 1))}
          disabled={currentPage === displayMax}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
            currentPage === displayMax
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
