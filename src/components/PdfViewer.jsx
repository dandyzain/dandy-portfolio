import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Loader2, 
  FileText, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';

// Configure the worker via Vite asset URL or fallback
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker || '/pdf.worker.min.mjs';
}

export default function PdfViewer({ fileUrl, title, language = 'id' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setScaleMultiplier(1);

    const loadingTask = pdfjsLib.getDocument({
      url: fileUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/cmaps/',
      cMapPacked: true,
    });

    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load PDF via pdfjs:', err);
        if (!isMounted) return;
        setError(err.message || 'Gagal memuat dokumen PDF');
        setLoading(false);
      });

    return () => {
      isMounted = false;
      if (loadingTask && loadingTask.destroy) {
        loadingTask.destroy();
      }
    };
  }, [fileUrl]);

  // Render Page onto Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    let isMounted = true;

    // Cancel any ongoing render task before starting a new one
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    pdfDoc.getPage(currentPage).then((page) => {
      if (!isMounted || !canvasRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth || 340;
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      
      // Calculate responsive base scale to fit container width with some padding
      const targetWidth = Math.min(containerWidth - 24, 850);
      const baseScale = targetWidth / unscaledViewport.width;
      const effectiveScale = Math.max(baseScale * scaleMultiplier, 0.4);

      const viewport = page.getViewport({ scale: effectiveScale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { alpha: false });

      // Handle high-DPI displays (retina / modern phones)
      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise
        .then(() => {
          renderTaskRef.current = null;
        })
        .catch((err) => {
          if (err.name !== 'RenderingCancelledException') {
            console.error('Render error:', err);
          }
        });
    });

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, currentPage, scaleMultiplier]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) setCurrentPage((p) => p + 1);
  };

  const handleZoomIn = () => {
    setScaleMultiplier((s) => Math.min(s + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScaleMultiplier((s) => Math.max(s - 0.25, 0.6));
  };

  const handleResetZoom = () => {
    setScaleMultiplier(1);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full flex flex-col items-center justify-center relative min-h-[50vh] sm:min-h-[60vh] select-none"
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-8 text-slate-300 gap-3">
          <Loader2 size={36} className="animate-spin text-indigo-400" />
          <p className="text-xs sm:text-sm font-medium">
            {language === 'en' ? 'Rendering Certificate...' : 'Memuat Dokumen Sertifikat...'}
          </p>
        </div>
      )}

      {/* Error Fallback */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center p-6 text-center max-w-md bg-slate-900/80 rounded-2xl border border-slate-800">
          <AlertCircle size={36} className="text-amber-400 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">
            {language === 'en' ? 'Direct PDF Preview' : 'Pratinjau PDF Langsung'}
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {language === 'en' 
              ? 'Your device can open this verified official document directly via browser engine.' 
              : 'Perangkat Anda dapat membuka dokumen resmi terverifikasi ini secara langsung.'}
          </p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-md"
          >
            <ExternalLink size={14} />
            <span>{language === 'en' ? 'Open Official PDF' : 'Buka PDF Resmi'}</span>
          </a>
        </div>
      )}

      {/* Rendered Canvas */}
      {!loading && !error && (
        <div className="w-full flex flex-col items-center">
          {/* Controls Bar */}
          <div className="w-full max-w-2xl px-3 py-1.5 mb-2 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between gap-2 text-xs text-slate-300">
            {/* Page navigation */}
            <div className="flex items-center gap-1">
              {numPages > 1 ? (
                <>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-[11px] px-1">
                    {currentPage} / {numPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= numPages}
                    className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              ) : (
                <span className="font-mono text-[11px] text-slate-400">
                  {language === 'en' ? 'Page 1 of 1' : 'Halaman 1'}
                </span>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={scaleMultiplier <= 0.6}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono hover:bg-slate-800 transition-colors"
                title="Reset Zoom"
              >
                {Math.round(scaleMultiplier * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={scaleMultiplier >= 2.5}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
            </div>
          </div>

          {/* Canvas Scrollable Wrapper */}
          <div className="w-full flex items-center justify-center overflow-x-auto p-1 scrollbar-thin">
            <canvas 
              ref={canvasRef} 
              className="rounded-lg shadow-2xl bg-white max-w-full transition-shadow duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
