const MessagesSkeleton = () => {
  return (
    <div className="p-4 bg-white  rounded-lg mb-1 animate-pulse">
      <div className="flex items-center border-b pb-2 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
        <div>
          <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-full h-24 bg-gray-300 rounded mb-4"></div>
      <div>
        <div className="w-36 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2 animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded mr-3"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-gray-300 rounded mb-1"></div>
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded ml-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesSkeleton;
