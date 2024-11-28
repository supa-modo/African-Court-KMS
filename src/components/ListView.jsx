import React from "react";

const ListView = ({ documents }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{doc.title}</td>
              <td className="p-4">{doc.category}</td>
              <td className="p-4">{doc.author}</td>
              <td className="p-4">{doc.uploadDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
