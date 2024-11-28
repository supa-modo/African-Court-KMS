import React from "react";
import { formatDate } from "../utils/dateTimeFunctions";

const GalleryView = ({ documents, fileIcons, onDocumentClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white bg-opacity-60 hover:bg-gray-100 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
          onClick={() => onDocumentClick(doc)}
        >
          <div className="flex justify-center mb-4">
            <img
              src={fileIcons[doc.file] || fileIcons.default}
              alt="File Icon"
              className="w-24 h-24 object-contain"
            />
          </div>
          {/* Document Title */}
          <h3 className="text-base text-center font-bold text-gray-600 line-clamp-3">
            {doc.title}
          </h3>

          {/* Display tags with truncation and ellipses */}
          <div className="flex justify-center flex-wrap gap-1 pt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            {doc.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-500 text-xs font-semibold px-2 py-[2px] rounded-md"
              >
                {tag}
              </span>
            ))}

            {/* Show "+X more" if there are more than 3 tags */}
            {doc.tags.length > 3 && (
              <span className="text-gray-400 text-xs font-semibold px-2">
                +{doc.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Author and Upload Date */}
          <p className="text-sm text-customMaroon pt-1 font-bold text-center">
            {doc.author}
          </p>
          <p className="text-sm text-gray-600 text-center">
            {formatDate(doc.uploadDate)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GalleryView;
