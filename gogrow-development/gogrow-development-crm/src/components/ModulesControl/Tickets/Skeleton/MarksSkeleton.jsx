import React from "react";

const MarksSkeleton = () => {
  return (
    <div className="flex space-x-2 mb-1">
      <div className="px-3 gap-1 py-1 flex items-center bg-gray-200 rounded-full text-xs w-36">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 ml-2"></div>
      </div>
      <div className="px-3 gap-1 py-1 flex items-center bg-gray-200 rounded-full text-xs w-36">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 ml-2"></div>
      </div>
      <div className="px-3 gap-1 py-1 flex items-center bg-gray-200 rounded-full text-xs w-36">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 ml-2"></div>
      </div>
    </div>
  );
};

export default MarksSkeleton;
