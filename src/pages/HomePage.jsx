import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Grid3X3,
  List,
  Upload,
  Search,
  FileText,
  Download,
  X,
} from "lucide-react";
import PdfIcon from "../assets/images/pdf_icon.png";
import WordIcon from "../assets/images/word.png";
import ExcelIcon from "../assets/images/excel.png";
import PptIcon from "../assets/images/powerpoint.png";

// Mock data (replace with actual API calls)
const mockDocuments = [
  {
    id: 1,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 1,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 1,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "excel",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 1,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.word",
  },
  {
    id: 1,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "ppt",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.ppt",
  },

  {
    id: 1,
    title: "Report on Lorem ipsum dolor sit amet consectetur",
    description: "Quarterly financial analysis and insights",
    file: "word",
    category: "Finance",
    author: "John Smith Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.excel",
  },

  {
    title: "Annual Financial Report and Analysis for the Year 2023",
    file: "pdf",
    tags: ["finance", "annual", "report", "budget", "growth", "forecasting"],
    author: "John Doe",
    originalLanguage: "English",
    translations: ["FR", "SP", "PT"],
    category: "Report",
    uploadDate: "February 15, 2023",
  },
  {
    title: "Internal Memo on Policy Updates for Workplace Conduct",
    file: "word",
    tags: ["memo", "policy", "workplace", "conduct"],
    author: "Jane Smith",
    originalLanguage: "English",
    translations: ["FR", "AR", "SW"],
    category: "Report",
    uploadDate: "April 04, 2024",
  },
  {
    title: "Q1 Sales Data and Performance Review Excel Sheet",
    file: "excel",
    tags: ["sales", "Q1", "performance", "excel", "revenue", "growth"],
    author: "Michael Johnson",
    originalLanguage: "Swahili",
    translations: ["ENG", "FR"],
    category: "Report",
    uploadDate: "January 30, 2011",
  },
  {
    title: "Client Meeting Notes - September 2024",
    file: "word",
    tags: ["meeting", "client", "notes", "discussion", "follow-up"],
    author: "Alexandra Green",
    originalLanguage: "English",
    translations: ["FR", "SW", "SP"],
    category: "Report",
    uploadDate: "September 20, 2024",
  },
  {
    title: "Company Budget and Financial Planning Overview for 2025",
    file: "excel",
    tags: ["budget", "financial", "planning", "forecast", "analysis"],
    author: "Thomas Brown",
    originalLanguage: "Portuguese",
    translations: ["ENG", "SP", "FR"],
    category: "Report",
    uploadDate: "August 08, 2010",
  },
  {
    title: "Executive Presentation - Year End Review 2023",
    file: "ppt",
    tags: ["executive", "review", "presentation", "performance", "ppt"],
    author: "Rachel Adams",
    originalLanguage: "French",
    translations: ["ENG", "SP"],
    category: "Report",
    uploadDate: "February 28, 2024",
  },
  {
    title: "Human Resources Policy Handbook 2024 Edition",
    file: "word",
    tags: ["HR", "policy", "handbook", "2024", "regulations"],
    author: "Samuel Harris",
    originalLanguage: "English",
    translations: ["FR", "AR", "SW"],
    category: "Report",
    uploadDate: "June 10, 2023",
  },
  {
    title: "Regional Sales Report and Analysis Q2 2024",
    file: "pdf",
    tags: ["sales", "Q2", "analysis", "report", "growth"],
    author: "Olivia White",
    originalLanguage: "Spanish",
    translations: ["ENG", "FR"],
    category: "Report",
    uploadDate: "July 07, 2023",
  },
  {
    title: "Team Building Event Summary and Feedback",
    file: "word",
    tags: ["team", "event", "feedback", "summary"],
    author: "Chris Parker",
    originalLanguage: "English",
    translations: ["FR", "SP"],
    category: "Report",
    uploadDate: "April 14, 2023",
  },
  {
    title: "IT Infrastructure Plan and Proposal for 2025",
    file: "ppt",
    tags: ["IT", "infrastructure", "plan", "proposal", "ppt", "2025"],
    author: "Sandra Lewis",
    originalLanguage: "Portuguese",
    translations: ["ENG", "FR", "SP"],
    category: "Report",
    uploadDate: "September 20, 2024",
  },
  {
    title: "Quarterly Product Development Overview Q3 2024",
    file: "pdf",
    tags: [
      "product",
      "development",
      "overview",
      "Q3",
      "progress",
      "innovation",
    ],
    author: "Nancy Rivera",
    originalLanguage: "French",
    translations: ["ENG", "SP"],
    category: "Report",
    uploadDate: "August 23, 2024",
  },
  {
    title: "Risk Management Strategy Document",
    file: "word",
    tags: ["risk", "management", "strategy", "word"],
    author: "Gregory Scott",
    originalLanguage: "English",
    translations: ["SW", "FR"],
    category: "Report",
    uploadDate: "March 27, 2024",
  },
  {
    title: "Board Meeting Presentation - Strategic Plans for 2024-2025",
    file: "ppt",
    tags: ["board", "presentation", "strategy", "plans", "ppt"],
    author: "Rebecca Morgan",
    originalLanguage: "English",
    translations: ["FR", "SP", "AR"],
    category: "Report",
    uploadDate: "October 05, 2024",
  },
  {
    title: "Financial Analysis for Q1 2024",
    author: "Jane Doe",
    originalLanguage: "Swahili",
    translations: ["ENG", "FR"],
    category: "Report",
    uploadDate: "August 14, 2024",
    tags: ["finance", "analysis", "quarterly"],
    file: "excel",
  },
];

// Document View Modes
const VIEW_MODES = {
  GALLERY: "gallery",
  LIST: "list",
};

// File Type Icons
const FILE_ICONS = {
  pdf: PdfIcon,
  word: WordIcon,
  excel: ExcelIcon,
  ppt: PptIcon,
  default: PdfIcon,
};

const HomePage = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODES.GALLERY);
  const [documents, setDocuments] = useState(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeTab, setActiveTab] = useState("public");

  // Filter documents based on search and access levels
  useEffect(() => {
    let filtered = documents.filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by access levels
      const matchesTab =
        activeTab === "public" ||
        (activeTab === "department" && doc.category === "Finance") ||
        (activeTab === "unit" && doc.author === "John Doe");

      return matchesSearch && matchesTab;
    });

    setFilteredDocuments(filtered);
  }, [searchTerm, activeTab, documents]);

  // Document Preview Modal
  const DocumentPreviewModal = ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl w-4/5 h-4/5 flex">
          {/* Document Preview */}
          <div className="w-1/2 p-6 border-r">
            <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <iframe
                src={document.fileUrl}
                className="w-full h-full"
                title="Document Preview"
              />
            </div>
          </div>

          {/* Document Details */}
          <div className="w-1/2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{document.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-gray-600">{document.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Author</p>
                  <p>{document.author}</p>
                </div>
                <div>
                  <p className="font-semibold">Upload Date</p>
                  <p>{document.uploadDate}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Contributors</p>
                <div className="flex space-x-2">
                  {document.contributors.map((contributor) => (
                    <span
                      key={contributor}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
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
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <Download className="mr-2" /> Download Document
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Gallery View Component
  const GalleryView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDocuments.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer"
          onClick={() => setSelectedDocument(doc)}
        >
          <div className="flex justify-center mb-4">
            <img
              src={FILE_ICONS[doc.file] || FILE_ICONS.default}
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

  // List View Component
  const ListView = () => (
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
          {filteredDocuments.map((doc) => (
            <tr
              key={doc.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedDocument(doc)}
            >
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Document Management
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Upload className="mr-2" /> Upload Document
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full p-3 pl-10 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            <button
              className={`p-2 rounded ${viewMode === VIEW_MODES.GALLERY ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode(VIEW_MODES.GALLERY)}
            >
              <Grid3X3 />
            </button>
            <button
              className={`p-2 rounded ${viewMode === VIEW_MODES.LIST ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode(VIEW_MODES.LIST)}
            >
              <List />
            </button>
          </div>
        </div>

        {/* Access Level Tabs */}
        <div className="mb-6 flex space-x-4">
          {[
            { key: "public", label: "Public Files", icon: FolderOpen },
            { key: "department", label: "Department Files", icon: FileText },
            { key: "unit", label: "Unit Files", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`
                flex items-center px-4 py-2 rounded-lg 
                ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }
              `}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon className="mr-2" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Documents View */}
        {viewMode === VIEW_MODES.GALLERY ? <GalleryView /> : <ListView />}

        {/* Document Preview Modal */}
        {selectedDocument && (
          <DocumentPreviewModal
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
