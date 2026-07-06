import { useState } from "react";

const PublicationButtons = ({ downloads, abstract, bibtex, hideAbstract, hideBibtex, video }) => {
  const [showDownloads, setShowDownloads] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);

  const handleDownloadsClick = () => {
    setShowDownloads(!showDownloads);
    if (!showDownloads) {
      setShowAbstract(false);
      setShowBibtex(false);
    }
  };

  const handleAbstractClick = () => {
    setShowAbstract(!showAbstract);
    if (!showAbstract) {
      setShowDownloads(false);
      setShowBibtex(false);
    }
  };

  const handleBibtexClick = () => {
    setShowBibtex(!showBibtex);
    if (!showBibtex) {
      setShowDownloads(false);
      setShowAbstract(false);
    }
  };

  // Parse downloads - can be array of {label, url} objects
  const downloadLinks = downloads || [];

  // Check if any dropdown is open
  const anyDropdownOpen = showDownloads || showAbstract || showBibtex;

  return (
    <div className="publication-buttons my-4 sm:my-6">
      {/* Buttons Row */}
      <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${!anyDropdownOpen ? 'mb-10 sm:mb-[70px]' : 'mb-2'}`}>
        {/* Download Button */}
        {downloadLinks.length > 0 && (
          <button
            onClick={handleDownloadsClick}
            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${
              showDownloads
                ? "bg-[#4159A3] text-white"
                : "bg-[#4159A3] text-white hover:bg-[#354a8a]"
            }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${
                showDownloads ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {/* Abstract Button */}
        {!hideAbstract && (
          <button
            onClick={handleAbstractClick}
            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${
              showAbstract
                ? "bg-[#4159A3] text-white"
                : "bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb]"
            }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Abstract
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${
                showAbstract ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {/* BibTeX Button */}
        {!hideBibtex && (
          <button
            onClick={handleBibtexClick}
            className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${
              showBibtex
                ? "bg-[#4159A3] text-white"
                : "bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb]"
            }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            BibTeX
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${
                showBibtex ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {/* Video Button */}
        {video && (
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb] no-underline"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Video
          </a>
        )}
      </div>

      {/* Downloads Dropdown */}
      {showDownloads && downloadLinks.length > 0 && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-10 sm:mb-[70px] bg-[#E8EBF5] dark:bg-[#2a3561] border-l-4 border-[#4159A3] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#4159A3] dark:text-[#E5F4F4] mb-2 sm:mb-3">
            Downloads
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {downloadLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#4159A3] bg-white dark:bg-[#4159A3] dark:text-white border border-[#4159A3] rounded hover:bg-[#4159A3] hover:text-[#f0f0f0] dark:hover:bg-[#354a8a] dark:hover:text-[#f0f0f0] active:text-[#e8e8e8] transition-colors duration-200 no-underline"
              >
                <svg
                  className="w-3 h-3 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Abstract Dropdown */}
      {showAbstract && !hideAbstract && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-10 sm:mb-[70px] bg-[#E8EBF5] dark:bg-[#E8EBF5] border-l-4 border-[#4159A3] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#4159A3] dark:text-[#4159A3] mb-2">
            Abstract
          </h4>
          <p className="text-xs sm:text-sm text-black dark:text-black leading-relaxed whitespace-pre-wrap">
            {abstract || "Abstract not available."}
          </p>
        </div>
      )}

      {/* BibTeX Dropdown */}
      {showBibtex && !hideBibtex && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-10 sm:mb-[70px] bg-gray-700 dark:bg-gray-800 border-l-4 border-[#E5F4F4] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#E5F4F4] mb-2">
            BibTeX
          </h4>
          <pre className="text-[10px] sm:text-xs text-white font-mono overflow-x-auto whitespace-pre-wrap">
            {bibtex || "BibTeX citation not available."}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PublicationButtons;
