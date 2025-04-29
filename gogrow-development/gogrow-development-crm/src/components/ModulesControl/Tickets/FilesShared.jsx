import React from "react";
import icon from "/public/Rectangle 142.png";

const FilesShared = () => {
  const files = [
    {
      name: "image.jpg",
      description: "Shared with go grow on May 25th",
    },
    {
      name: "image.jpg",
      description: "Shared with go grow on May 25th",
    },
    {
      name: "image.jpg",
      description: "Shared with go grow on May 25th",
    },
    {
      name: "image.jpg",
      description: "Shared with go grow on May 25th",
    },
    {
      name: "image.jpg",
      description: "Shared with go grow on May 25th",
    },
  ];

  return (
    <div className="bg-white p-4   w-64">
      <h2 className="text-lg font-semibold mb-4">Files Shared</h2>
      <div>
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center mb-2">
            <img
              src={icon} // Replace with your image path
              alt={file.name}
              className="w-8 h-8 object-cover mr-4"
            />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{file.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
        Show More
      </button>
    </div>
  );
};

export default FilesShared;
