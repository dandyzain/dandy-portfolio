import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  labels = {},
  sectionId
}) {
  if (totalPages <= 1) {
    return null;
  }

  const {
    prev = 'Previous',
    next = 'Next',
    showing = 'Showing',
    of = 'of',
    items = 'items',
    page = 'Page'
  } = labels;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    onPageChange(newPage);
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const topPos = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  };

  // Generate pagination items (with ellipses if necessary)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Items Range Summary */}
      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium order-2 sm:order-1 text-center sm:text-left">
        <span>{showing} </span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{startIdx}-{endIdx}</span>
        <span> {of} </span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{totalItems}</span>
        <span> {items} </span>
        <span className="hidden md:inline text-slate-400 dark:text-slate-500">
          • {page} {currentPage} {of} {totalPages}
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
        {/* Previous Button */}
        <motion.button
          whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-200/60 dark:border-slate-800'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 shadow-pastel-sm'
          }`}
          aria-label={prev}
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">{prev}</span>
        </motion.button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs text-slate-400 select-none"
                >
                  •••
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <motion.button
                key={p}
                whileHover={!isActive ? { scale: 1.08 } : {}}
                whileTap={!isActive ? { scale: 0.94 } : {}}
                onClick={() => handlePageClick(p)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-pastel-md ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-pastel-sm'
                }`}
                aria-label={`Page ${p}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {p}
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border-slate-200/60 dark:border-slate-800'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 shadow-pastel-sm'
          }`}
          aria-label={next}
        >
          <span className="hidden sm:inline">{next}</span>
          <ChevronRight size={15} />
        </motion.button>
      </div>
    </div>
  );
}
