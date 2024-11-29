import React, { useState, useEffect } from "react";
import DocumentPreviewModal from "../components/DocumentPreviewModal";
import GalleryView from "../components/GalleryView";
import ListView from "../components/ListView";
import {
  FolderOpen,
  Grid3X3,
  List,
  Upload,
  Search,
  FileText,
  Download,
  X,
  LucideArrowDownUp,
} from "lucide-react";
import PdfIcon from "../assets/images/pdf_icon.png";
import WordIcon from "../assets/images/word.png";
import ExcelIcon from "../assets/images/excel.png";
import PptIcon from "../assets/images/powerpoint2.png";
import BgImage from "../assets/images/hammer3.png";
import Header from "../components/Header";

//TODO: Mock data (replace with actual API calls)
const mockDocuments = [
  {
    id: 1,
    title: "Company Budget and Financial Planning Overview for 2025",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eaque non unde iure natus amet ipsam, ratione ullam nesciunt nulla accusamus libero quasi dolores, repellat quo pariatur! Blanditiis, laudantium voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sapiente nisi molestias, doloremque porro dolorem quod saepe officia accusantium aut unde, labore molestiae obcaecati laboriosam a deserunt dolore veritatis officiis!",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    translations: ["FR", "SP", "SW", "AR"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 2,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    translations: ["FR", "SP", "PT"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 3,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "excel",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    translations: ["FR", "SP", "PT"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.pdf",
  },
  {
    id: 4,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "pdf",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    translations: ["FR", "SP", "PT"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.word",
  },
  {
    id: 5,
    title: "Q3 Financial Report",
    description: "Quarterly financial analysis and insights",
    file: "ppt",
    category: "Finance",
    author: "John Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    tags: ["Finance", "Q3", "Report"],
    translations: ["FR", "SP", "PT"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.ppt",
  },

  {
    id: 6,
    title: "Report on Lorem ipsum dolor sit amet consectetur",
    description: "Quarterly financial analysis and insights",
    file: "word",
    category: "Finance",
    author: "John Smith Doe",
    uploadDate: "2023-11-15",
    originalLanguage: "English",
    translations: ["FR", "SP", "PT"],
    tags: ["Finance", "Q3", "Report"],
    contributors: ["Jane Smith", "Mike Johnson"],
    fileUrl: "/sample-document.excel",
  },

  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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

  return (
    <div>
      <Header />
      <div
        className="h-[calc(100vh-5.5rem)] overflow-y-auto p-8"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        {/* Gold Background Color Overlay */}
        <div className="absolute inset-0 bg-customGold opacity-85 z-0"></div>
        <div className="relative z-10 ">
          <div className="max-w-screen-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex space-x-4 justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-700 pr-6">
                AfCHPR Knowledge Management System
              </h1>

              {/* Search Bar */}
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Search document title, name or author....."
                  className="w-full px-3 pl-14 py-2 border font-semibold border-customMaroon rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={19}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 text-customMaroon"
                />
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex justify-between items-center">
              {/* Access Level Tabs */}
              <div className="flex space-x-4 font-semibold">
                {[
                  { key: "public", label: "Public Files", icon: FolderOpen },
                  {
                    key: "department",
                    label: "Department Files",
                    icon: FileText,
                  },
                  { key: "unit", label: "Unit Files", icon: FileText },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`
                flex items-center px-6 py-2 rounded-lg 
                ${
                  activeTab === tab.key
                    ? "bg-customMaroon text-white"
                    : "bg-white bg-opacity-70 text-gray-600 hover:bg-gray-100"
                }
              `}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <tab.icon className="mr-2" /> {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4 ">
                {/* Upload document button */}
                <button className="bg-white bg-opacity-70 text-gray-600 font-semibold px-10 py-2 rounded-md flex items-center hover:bg-customMaroon hover:bg-opacity-90 hover:text-white  mr-4">
                  <Upload className="mr-3" /> Upload New Document
                </button>
                <button className="bg-white bg-opacity-70 w-auto text-gray-600 px-8 rounded-md py-2 font-semibold hover:bg-customMaroon hover:bg-opacity-90 hover:text-white flex items-center gap-3">
                  Date Uploaded
                  <LucideArrowDownUp size={19} />
                </button>
                <div className="flex items-center border border-customMaroon rounded-md overflow-hidden">
                  <button
                    className={`flex-1 p-2 ${viewMode === VIEW_MODES.GALLERY ? "bg-customMaroon text-white" : "bg-white bg-opacity-50 text-gray-600"}`}
                    onClick={() => setViewMode(VIEW_MODES.GALLERY)}
                  >
                    <Grid3X3 />
                  </button>
                  <div className="w-px bg-gray-300"></div>
                  <button
                    className={`flex-1 p-2 ${viewMode === VIEW_MODES.LIST ? "bg-customMaroon text-white" : "bg-white bg-opacity-50 text-gray-600"}`}
                    onClick={() => setViewMode(VIEW_MODES.LIST)}
                  >
                    <List />
                  </button>
                </div>
              </div>
            </div>

            {/* Documents View */}
            <div>
              {viewMode === VIEW_MODES.GALLERY ? (
                <GalleryView
                  documents={filteredDocuments}
                  fileIcons={FILE_ICONS}
                  onDocumentClick={setSelectedDocument}
                />
              ) : (
                <ListView documents={filteredDocuments} />
              )}
              {selectedDocument && (
                <DocumentPreviewModal
                  document={selectedDocument}
                  onClose={() => setSelectedDocument(null)}
                />
              )}
            </div>

            {/* Document Preview Modal */}
            {selectedDocument && (
              <DocumentPreviewModal
                document={selectedDocument}
                onClose={() => setSelectedDocument(null)}
              />
            )}
          </div>
        </div>

        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      </div>
    </div>
  );
};

export default HomePage;
