import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XIcon, SaveIcon, Upload } from "lucide-react";
import Header from "../components/Header";
import BgImage from "../assets/images/hammer3.png";

// Constants
const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Swahili", label: "Swahili" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Arabic", label: "Arabic" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
];

const UNITS = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];
const PRIVACY_OPTIONS = ["Public", "Staff", "Internal"];
const DOCUMENT_TYPES = ["Word", "Excel", "PDF", "PPT"];
const CATEGORIES = ["Report", "Advert", "Memo"];

// Utility function for local testing
const saveToLocalStorage = (data) => {
  const existingData = JSON.parse(localStorage.getItem("documents") || "[]");
  localStorage.setItem("documents", JSON.stringify([...existingData, data]));
};

const DocumentUploadScreen = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(Array(6).fill(null));
  const [formData, setFormData] = useState({
    title: "",
    numberOfPages: "",
    description: "",
    unit: UNITS[0],
    privacy: PRIVACY_OPTIONS[0],
    language: LANGUAGES[0].value,
    categories: [],
    tags: "",
    documentType: DOCUMENT_TYPES[0],
    author: "",
    contributors: "",
  });

  // Memoized file input handler to prevent unnecessary re-renders
  const handleFileChange = useMemo(
    () => (index, file) => {
      const updatedFiles = [...selectedFiles];
      updatedFiles[index] = file;
      setSelectedFiles(updatedFiles);
    },
    [selectedFiles]
  );

  // Generic change handler with improved type handling
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          categories: checked
            ? [...prev.categories, value]
            : prev.categories.filter((cat) => cat !== value),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  // Form submission handler with improved error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpload = new FormData();

    // Dynamically append form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "categories") {
        dataToUpload.append(key, value);
      }
    });

    // Append categories as a comma-separated string
    dataToUpload.append("categories", formData.categories.join(","));

    // Append files
    selectedFiles.forEach((file, index) => {
      if (file) {
        dataToUpload.append(`file${index + 1}`, file);
      }
    });

    try {
      // Simulated backend upload (replace with actual endpoint)
      // const response = await axios.post('/api/documents', dataToUpload);

      // Local testing fallback
      saveToLocalStorage({ ...formData, files: selectedFiles });

      alert("Document uploaded successfully!");
      navigate("/documents"); // Navigate to document list
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document. Please try again.");
    }
  };

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
          <div className="max-w-screen-xl mx-auto">
                <div className="bg-white shadow-lg rounded-2xl p-8 relative mx-auto">
              {/* Close Button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold text-center text-customMaroon mb-8">
                Upload New Document
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Document Details */}
                <div className="flex gap-4">
                  <div className="w-3/4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Document Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of Pages
                    </label>
                    <input
                      type="number"
                      name="numberOfPages"
                      value={formData.numberOfPages}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Total pages"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    placeholder="Brief document description"
                    required
                  />
                </div>

                {/* Metadata Selects */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      required
                    >
                      {UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Privacy
                    </label>
                    <select
                      name="privacy"
                      value={formData.privacy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    >
                      {PRIVACY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Categories
                  </label>
                  <div className="flex space-x-4">
                    {CATEGORIES.map((category) => (
                      <label
                        key={category}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          value={category}
                          checked={formData.categories.includes(category)}
                          onChange={handleChange}
                          className="form-checkbox text-customMaroon"
                        />
                        <span className="ml-2">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Comma-separated tags"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Document Type
                    </label>
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    >
                      {DOCUMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* File Uploads */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-customMaroon mb-4 text-center">
                    Upload Documents
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {LANGUAGES.map((lang, index) => (
                      <div key={lang.value}>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {lang.label} Document
                        </label>
                        <div className="relative border-2 border-dashed rounded-md p-2">
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) =>
                              handleFileChange(index, e.target.files[0])
                            }
                          />
                          <div className="flex items-center justify-center font-semibold text-center text-gray-400">
                            <Upload size={19} className="mr-2" />
                            {selectedFiles[index]
                              ? selectedFiles[index].name
                              : "Upload File"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Author & Contributors */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Author's name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Contributors
                    </label>
                    <input
                      type="text"
                      name="contributors"
                      value={formData.contributors}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Other contributors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-customMaroon text-white rounded-lg hover:bg-customMaroonHover transition-colors"
                  >
                    <SaveIcon className="mr-2" />
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadScreen;
