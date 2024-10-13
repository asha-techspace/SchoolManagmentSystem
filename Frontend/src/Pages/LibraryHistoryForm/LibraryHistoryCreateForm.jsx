// src/components/LibraryHistoryForm.jsx
import React, { useState } from "react";

const LibraryHistoryForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    bookName: "",
    borrowDate: "",
    returnDate: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let validationErrors = {};

    if (!formData.bookName.trim()) {
      validationErrors.bookName = "Book Name is required";
    }

    if (!formData.borrowDate) {
      validationErrors.borrowDate = "Borrow Date is required";
    }

    if (!formData.returnDate) {
      validationErrors.returnDate = "Return Date is required";
    }

    if (!formData.status.trim()) {
      validationErrors.status = "Status is required";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Library history data: ", formData);
      alert("Form Submitted Successfully!");
      setFormData({ bookName: "", borrowDate: "", returnDate: "", status: "" }); // Reset form after successful submission
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Library History Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.bookName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.bookName && (
              <p className="text-red-500 text-sm mt-1">{errors.bookName}</p>
            )}
          </div>

          {/* Borrow Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Borrow Date</label>
            <input
              type="date"
              name="borrowDate"
              value={formData.borrowDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.borrowDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.borrowDate && (
              <p className="text-red-500 text-sm mt-1">{errors.borrowDate}</p>
            )}
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.returnDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.status ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Status</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Submit Library History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibraryHistoryForm;
