const TicketCardSkeleton = () => {
  return (
    <div className="border rounded-card shadow-card p-3 border-yellowprimary bg-gray-200 animate-pulse">
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
  );
};

export default TicketCardSkeleton;
