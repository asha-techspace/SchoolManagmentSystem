// src/components/FeesRemarksForm.jsx
import React, { useState } from "react";

const FeesRemarksForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    studentId: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    remarks: "",
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

    if (!formData.feeType.trim()) {
      validationErrors.feeType = "Fee Type is required";
    }

    if (!formData.amount || isNaN(formData.amount)) {
      validationErrors.amount = "Amount must be a valid number";
    }

    if (!formData.paymentDate) {
      validationErrors.paymentDate = "Payment Date is required";
    }

    if (!formData.remarks.trim()) {
      validationErrors.remarks = "Remarks are required";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Fees remarks data: ", formData);
      alert("Form Submitted Successfully!");
      setFormData({ studentId: "", feeType: "", amount: "", paymentDate: "", remarks: "" }); // Reset form after successful submission
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
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
              className={`mt-1 block w-full p-2 border ${
                errors.studentId ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
            )}
          </div>

          {/* Fee Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fee Type</label>
            <input
              type="text"
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.feeType ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.feeType && (
              <p className="text-red-500 text-sm mt-1">{errors.feeType}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.paymentDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.paymentDate && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentDate}</p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.remarks ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.remarks && (
              <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Submit Fees Remarks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeesRemarksForm;
