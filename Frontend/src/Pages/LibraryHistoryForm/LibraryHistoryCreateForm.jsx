import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LibraryHistoryForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    student_id: "",
    bookId: "",
    title: "",
    author: "",
    dueDate: "",
    issueDate: "",
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

    if (!formData.student_id) {
      validationErrors.student_id = "Student ID is required";
    }

    if (!formData.bookId) {
      validationErrors.bookId = "Book ID is required";
    }

    if (!formData.title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      validationErrors.author = "Author is required";
    }

    if (!formData.dueDate) {
      validationErrors.dueDate = "Due Date is required";
    }

    if (formData.status === "returned" && !formData.issueDate) {
      validationErrors.issueDate = "Returned Date is required when status is 'returned'";
    }

    if (!formData.status) {
      validationErrors.status = "Status is required";
    }

    return validationErrors;
  };

  const addLibRecord = async (record) => {
    try {
      let id=record.student_id;
      let payload = record;
      delete payload.student_id;
      console.log(`Payload:: ${JSON.stringify(payload)}`)
      const response = await axios.post(`http://localhost:5000/api/students/library/${id}`, payload,{ withCredentials: true });
      console.log(`add Library response:: ${JSON.stringify(response)}`)
      const data = response.data.message;
    } catch (err) {
      console.log(err)
    }
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Library history data: ", formData);
      addLibRecord(formData);
      alert("Library entry Successful!");
      setFormData({
        student_id: "",
        bookId: "",
        title: "",
        author: "",
        dueDate: "",
        issueDate: "",
        status: "",
      }); // Reset form after successful submission
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Library History Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.student_id ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>}
          </div>

            {/* Book ID */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Book ID</label>
            <input
              type="text"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.bookId ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.bookId && <p className="text-red-500 text-sm mt-1">{errors.bookId}</p>}
          </div>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.author ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
          </div>

          {/* Returned Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.issueDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
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
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
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
