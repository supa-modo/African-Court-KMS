import React from "react";
import {
  Edit,
  Edit2Icon,
  EditIcon,
  FileEdit,
  FileEditIcon,
  Trash2,
} from "lucide-react";
import { formatDateShort } from "../utils/dateTimeFunctions";

// Define file type icons
const FILE_ICONS = {
  pdf: "/src/assets/images/pdf2.png",
  word: "/src/assets/images/word.png",
  excel: "/src/assets/images/excel.png",
  ppt: "/src/assets/images/powerpoint2.png",
  default: "/src/assets/images/default_icon.png", // Fallback icon
};

const ListView = ({ documents, onDocumentClick }) => {
  return (
    <div className="rounded-2xl shadow-md overflow-x-auto">
      <table className="min-w-full table-auto bg-white bg-opacity-60 shadow-md overflow-hidden rounded-t-2xl">
        <thead>
          <tr className="bg-customMaroon text-white rounded-t-2xl">
            <th className="p-4 text-base font-semibold w-10 rounded-tl-xl">
              #
            </th>
            <th className="py-3 pl-6  text-left flex-1">Document Name</th>
            <th className="py-3 pl-3 text-left">Category</th>
            <th className="py-3 pl-3 text-left">Type</th>
            <th className="py-3 pl-3 text-left min-w-32">Author</th>
            <th className="py-3 pl-3 text-left">Original Language</th>
            <th className="py-3 pl-3 text-left">Created</th>
            <th className="py-3 px-6 text-left rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => {
            // Determine icon based on file type
            const fileIcon =
              FILE_ICONS[doc.file.toLowerCase()] || FILE_ICONS.default;

            return (
              <tr
                key={doc.id}
                onClick={() => onDocumentClick(doc)}
                className="border-b border-b-gray-200 hover:bg-customGold hover:bg-opacity-70 cursor-pointer transition duration-200"
              >
                <td className="px-4 py-4 font-medium w-12 text-center">
                  {index + 1}.
                </td>
                <td className="py-3 pl-3 text-left flex items-center gap-3 flex-1">
                  {/* Render file icon */}
                  <img
                    src={fileIcon}
                    alt={`${doc.file} icon`}
                    className="w-[29px] h-[31px]"
                  />
                  <div className="line-clamp-2 pl-2 font-semibold overflow-hidden text-ellipsis">
                    {doc.title}
                  </div>
                </td>
                <td className="py-3 pl-3 text-left">{doc.category}</td>
                <td className="py-3 pl-3 text-left">{doc.file}</td>
                <td className="py-3 pl-3 font-semibold text-left min-w-32">
                  {doc.author}
                </td>
                <td className="py-3 pl-3 text-left">{doc.originalLanguage}</td>
                <td className="py-3 pl-3 text-left">
                  {formatDateShort(doc.uploadDate)}
                </td>
                {/* Actions with edit and delete buttons */}
                <td className="py-3 px-6 text-left flex gap-8">
                  <button className="text-customMaroon hover:text-white transition">
                    <FileEditIcon size={24} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={24} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
