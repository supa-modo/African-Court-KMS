import React from "react";

const GalleryView = ({ documents, fileIcons, onDocumentClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white bg-opacity-60 rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer"
          onClick={() => onDocumentClick(doc)}
        >
          <div className="flex justify-center mb-4">
            <img
              src={fileIcons[doc.file] || fileIcons.default}
              alt="File Icon"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h3 className="text-center font-semibold text-gray-800 mb-2">
            {doc.title}
          </h3>
          <p className="text-center text-gray-500 text-sm">
            {doc.author} | {doc.uploadDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GalleryView;
