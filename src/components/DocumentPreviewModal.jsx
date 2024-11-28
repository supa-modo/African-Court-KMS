import React from "react";
import { Download, X } from "lucide-react";
import { formatDate } from "../utils/dateTimeFunctions";

const DocumentPreviewModal = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0  bg-opacity-60 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="relative h-[70vh] w-[85vw] lg:w-[60vw] lg:h-[75vh] max-w-5xl bg-white rounded-lg shadow-lg p-4 flex">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-customMaroon hover:text-gray-800 focus:outline-none"
        >
          <X size={25} />
        </button>

        {/* Document Preview */}
        <div className="w-[55%] p-3 pr-4 border-r">
          <div className="h-full bg-gray-100 rounded-md flex items-center justify-center">
            {/* //TODO: Add document preview url */}
            {/* <iframe
              src={document.fileUrl}
              className="w-full h-full"
              title="Document Preview"
            /> */}
            <span className="text-gray-500">[Document Preview Image]</span>
          </div>
        </div>

        {/* Document Details */}
        <div className="w-[45%] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-customMaroon line-clamp-3 pt-4">
              {document.title}
            </h3>
          </div>

          <div className="space-y-4 pb-8">
            <div>
              <p className="text-gray-600 line-clamp-4">
                {document.description}
              </p>
            </div>
            <p className="text-base">
              <span className="font-semibold">Author: </span>
              <span className="text-customGreen font-bold">
                {document.author}
              </span>
            </p>
            <p className="text-base">
              <span className="font-semibold">Original Language: </span>
              <span className="font-semibold text-customMaroon">
                {document.originalLanguage || "English"}{" "}
              </span>
            </p>

            <p className="text-base">
              <span className="font-semibold">Available Translations: </span>
              <span className="font-bold text-customMaroon">
                {/* {document.translations.join(", ") || "FR, SW, AR, POR"} */}
                {"FR, SW, AR, POR"}
              </span>
            </p>
            <p className="text-base">
              <span className="font-semibold">Uploaded: </span>
              <span className="text-customGreen font-bold">
                {formatDate(document.uploadDate)}
              </span>
            </p>

            <div>
              <p className="font-semibold">Contributors</p>
              <div className="flex space-x-2">
                {document.contributors.map((contributor) => (
                  <span
                    key={contributor}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                  >
                    {contributor}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold">Tags</p>
              <div className="flex flex-wrap gap-2">
                {document.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-500 bg-opacity-80 text-gray-100 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Download button */}
          <div className="flex items-center gap-2">
            <button className="w-full bg-customMaroon bg-opacity-95 hover:shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-1 text-white py-2 rounded-md shadow hover:bg-opacity-100">
              <div className="flex items-center justify-center gap-2 ">
                <Download size={20} />
                <span className="font-semibold">Download Document</span>
              </div>
            </button>
            {/* Select input to choose language for download */}
            <select className="border border-customMaroon font-bold text-customMaroon rounded-lg py-2 px-4 focus:outline-none">
              {document.translations.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
