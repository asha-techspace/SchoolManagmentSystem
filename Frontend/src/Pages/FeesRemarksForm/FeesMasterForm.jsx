import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeesRemarksCreateForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    studentId: "",
    feesType: "",
    totalAmount: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let validationErrors = {};

    if (!formData.studentId.trim()) {
      validationErrors.studentId = "Student ID is required";
    }

    if (!formData.feesType) {
      validationErrors.feesType = "Fee Type is required";
    }

    if (formData.totalAmount && isNaN(formData.totalAmount)) {
      validationErrors.totalAmount = "Total Fees must be a valid number";
    }

    if (!formData.dueDate) {
      validationErrors.dueDate = "Due Date is required";
    }

    return validationErrors;
  };

  const addFeeRecord = async (record) => {
    try {
      let id = record.studentId;
      let payload = record;
      delete payload.studentId;
      console.log(`Payload:: ${JSON.stringify(payload)}`)
      const response = await axios.post(`http://localhost:5000/api/students/${id}/addfees/`, payload,{ withCredentials:true });
      console.log(`add fees response:: ${JSON.stringify(response)}`)
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
      console.log("Fees remarks data: ", formData);
      addFeeRecord(formData);
     alert("Fees Detail Submitted Successfully!");
      setFormData({
        studentId: "",
        feesType: "",
        totalAmount: "",
        dueDate: "",
      }); // Reset form after successful submission
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Fees Remarks Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.studentId ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>

          {/* Fee Type (Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fee Type</label>
            <select
              name="feesType"
              value={formData.feesType}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.feesType ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Fee Type</option>
              <option value="tutition">Tuition</option>
              <option value="hostel">Hostel</option>
              <option value="pta">PTA</option>
              <option value="activities">Activities</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            {errors.feesType && <p className="text-red-500 text-sm mt-1">{errors.feesType}</p>}
          </div>



          {/* Total Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Fees</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.totalAmount ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.totalAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.totalAmount}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.dueDate ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeesRemarksCreateForm;