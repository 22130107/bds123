interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center gap-4">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-12 h-12 border border-outline flex items-center justify-center hover:bg-antique-gold hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <span
        className="font-label-caps text-primary px-4"
        style={{ fontSize: "12px", letterSpacing: "0.1em", fontWeight: 700 }}
      >
        TRANG {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-12 h-12 border border-outline flex items-center justify-center hover:bg-antique-gold hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
