const TicketsListSkeleton = () => {
  return (
    <div className="p-2">
      {/* Header Skeleton */}
      <div className="bg-gray-200 h-6 mb-4 rounded w-1/4 animate-pulse"></div>

      {/* Search Skeleton */}
      {/* <div className="relative mt-5 flex items-center">
        <div className="w-full h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div> */}

      {/* Tickets Header Skeleton */}
      {/* <div className="mt-3 pb-4 flex justify-between items-center">
        <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div> */}

      {/* Ticket Cards Skeleton */}
      <div className="h-[80vh] flex flex-col gap-3 py-2 overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-card shadow-card p-3   bg-gray-200 animate-pulse">
            {/* Customer Line Skeleton */}
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Description Skeleton */}
            <div className="mt-4 w-full h-4 bg-gray-300 rounded mb-2"></div>

            {/* Marks Skeleton */}
            <div className="grid grid-cols-3 gap-x-1 gap-y-1 mt-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-8 bg-gray-300 rounded flex justify-center items-center animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsListSkeleton;
