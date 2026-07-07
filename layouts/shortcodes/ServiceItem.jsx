import React from "react";

const ServiceItem = ({ title, focus, description, expectation, tools }) => {
  return (
    <div className="mb-8 sm:mb-12 text-left">
      <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-1">{title}</h3>
      {focus && <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic mb-3">{focus}</p>}
      <p className="text-sm sm:text-base text-text dark:text-darkmode-light mb-4">{description}</p>
      
      {expectation && (
        <div className="mb-4">
          <p className="text-[15px] sm:text-base font-medium text-dark dark:text-white mb-1">What to Expect:</p>
          <p className="text-sm sm:text-[15px] text-text dark:text-darkmode-light border-l-2 border-primary pl-3">{expectation}</p>
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full border border-blue-200/50 dark:border-blue-700/50 bg-blue-100/30 dark:bg-blue-900/30 backdrop-blur-md shadow-sm text-blue-800 dark:text-blue-200"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceItem;
