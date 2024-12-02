import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XIcon, SaveIcon, Upload, TagIcon, UserIcon } from "lucide-react";
import Header from "../components/Header";
import BgImage from "../assets/images/hammer3.png";

// Enhanced Constants with More Comprehensive Options
const LANGUAGES = [
  { value: "English", label: "English", code: "en" },
  { value: "Swahili", label: "Swahili", code: "sw" },
  { value: "Portuguese", label: "Portuguese", code: "pt" },
  { value: "Arabic", label: "Arabic", code: "ar" },
  { value: "Spanish", label: "Spanish", code: "es" },
  { value: "French", label: "French", code: "fr" },
];

// Enhanced Document Categories
const DOCUMENT_CATEGORIES = [
  { value: "Administrative", label: "Administrative" },
  { value: "Financial", label: "Financial Reports" },
  { value: "HR", label: "Human Resources" },
  { value: "Legal", label: "Legal Documents" },
  { value: "Marketing", label: "Marketing Materials" },
  { value: "Operations", label: "Operations Manual" },
  { value: "Project", label: "Project Documentation" },
  { value: "Research", label: "Research Papers" },
  { value: "Technical", label: "Technical Specifications" },
];

// Predefined System Tags
const SYSTEM_TAGS = [
  "Confidential",
  "Strategic",
  "Annual",
  "Quarterly",
  "Internal",
  "External",
  "Compliance",
  "Budget",
];

// Privacy Levels with Hierarchical Structure
const PRIVACY_LEVELS = [
  {
    value: "Public",
    label: "Public",
    description: "Accessible to everyone",
  },
  {
    value: "Organization",
    label: "Entire Organization",
    description: "Accessible to all employees",
  },
  {
    value: "Department",
    label: "Department Level",
    description: "Restricted to specific department",
  },
  {
    value: "Unit",
    label: "Unit Level",
    description: "Restricted to specific unit",
  },
];

// Departments and Units (Mock Data - replace with actual organization structure)
const DEPARTMENTS = [
  "Finance",
  "Human Resources",
  "IT",
  "Marketing",
  "Sales",
  "Operations",
  "Legal",
  "Research & Development",
];

const UNITS = {
  Finance: ["Accounting", "Financial Planning", "Investments"],
  HR: ["Recruitment", "Training", "Employee Relations"],
  IT: ["Infrastructure", "Development", "Security"],
  // Add more departments and their units
};

const DocumentUploadScreen = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(LANGUAGES.map(() => null));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numberOfPages: "",
    originalLanguage: LANGUAGES[0].value,
    privacyLevel: PRIVACY_LEVELS[0].value,
    department: "",
    unit: "",
    categories: [],
    systemTags: [],
    customTags: "",
    author: "",
    contributors: "",
    documentType: "",
  });

  // Enhanced File Upload Handler
  const handleFileChange = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);
  };

  // Dynamic Department and Unit Management
  useEffect(() => {
    // Reset unit when department changes
    setFormData((prev) => ({
      ...prev,
      unit: "",
    }));
  }, [formData.department]);

  // Tag Suggestion Logic (Simplified)
  const getSuggestedTags = (input) => {
    return SYSTEM_TAGS.filter((tag) =>
      tag.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle checkbox for categories
    if (type === "checkbox") {
      const checkboxValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.includes(checkboxValue)
          ? prev.categories.filter((cat) => cat !== checkboxValue)
          : [...prev.categories, checkboxValue],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formDataToSubmit.append(key, value.join(","));
      } else {
        formDataToSubmit.append(key, value);
      }
    });

    // Append files
    selectedFiles.forEach((file, index) => {
      if (file) {
        formDataToSubmit.append(`file_${LANGUAGES[index].code}`, file);
      }
    });

    try {
      // Placeholder for actual API endpoint
      // const response = await axios.post('/api/documents/upload', formDataToSubmit);

      console.log(
        "Document upload data:",
        Object.fromEntries(formDataToSubmit)
      );
      alert("Document uploaded successfully!");
      navigate("/documents");
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
            <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-8 relative mx-auto">
              {/* Close Button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-center text-customMaroon mb-6">
                Document Upload Center
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Document Basic Information */}
                <div className="flex gap-4">
                  <div className="w-2/3">
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
                  <div className="w-1/3">
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

                {/* Description and Language */}
                <div className="flex gap-4">
                  <div className="w-2/3">
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
                  <div className="w-1/3">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Original Language
                    </label>
                    <select
                      name="originalLanguage"
                      value={formData.originalLanguage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Privacy and Access Control */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Privacy Level
                    </label>
                    <select
                      name="privacyLevel"
                      value={formData.privacyLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                    >
                      {PRIVACY_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(formData.privacyLevel === "Department" ||
                    formData.privacyLevel === "Unit") && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {formData.privacyLevel === "Department"
                          ? "Select Department"
                          : "Select Unit"}
                      </label>
                      <select
                        name={
                          formData.privacyLevel === "Department"
                            ? "department"
                            : "unit"
                        }
                        value={
                          formData.privacyLevel === "Department"
                            ? formData.department
                            : formData.unit
                        }
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      >
                        {formData.privacyLevel === "Department" ? (
                          DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))
                        ) : formData.department ? (
                          UNITS[formData.department].map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))
                        ) : (
                          <option>Select Department First</option>
                        )}
                      </select>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Document Categories
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {DOCUMENT_CATEGORIES.map((category) => (
                      <label
                        key={category.value}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          value={category.value}
                          checked={formData.categories.includes(category.value)}
                          onChange={handleChange}
                          className="form-checkbox text-customMaroon"
                        />
                        <span className="ml-2 font-semibold text-gray-600">
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      System Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SYSTEM_TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-customMaroon text-opacity-75 px-3 py-1 rounded-lg text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Custom Tags
                    </label>
                    <input
                      type="text"
                      name="customTags"
                      value={formData.customTags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-customMaroon"
                      placeholder="Enter custom tags (comma-separated)"
                    />
                  </div>
                </div>

                {/* File Uploads */}
                <div>
                  <h3 className="text-xl font-semibold text-customMaroon mb-8 mt-10 text-center">
                    Document File Uploads - Multilingual
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {LANGUAGES.map((lang, index) => (
                      <div key={lang.value}>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {lang.label} Document
                        </label>
                        <div className="relative border-2 border-customMaroon border-opacity-40 border-dotted  rounded-md p-2">
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) =>
                              handleFileChange(index, e.target.files[0])
                            }
                          />
                          <div className="flex items-center justify-center font-semibold text-center text-customMaroon text-opacity-70">
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
                      placeholder="Primary Author name"
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
                      placeholder="Additional contributors (comma-separated)"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="flex font-semibold items-center px-14 py-[10px] bg-customMaroon text-white rounded-lg hover:bg-customMaroonHover transition-colors"
                  >
                    <SaveIcon className="mr-2" />
                    Upload Document(s)
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
