import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeesRemarksCreateForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    studentId: "",
    feeType: "",
    paymentDate: "",
    remarks: "",
    date: new Date().toISOString().split("T")[0], // Default to current date
    amountPaid: "",
    totalFees: "",
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

    if (!formData.feeType) {
      validationErrors.feeType = "Fee Type is required";
    }



    if (!formData.paymentDate) {
      validationErrors.paymentDate = "Payment Date is required";
    }

    if (!formData.remarks.trim()) {
      validationErrors.remarks = "Remarks are required";
    }

    if (!formData.date) {
      validationErrors.date = "Date is required";
    }

    if (!formData.amountPaid || isNaN(formData.amountPaid)) {
      validationErrors.amountPaid = "Amount Paid must be a valid number";
    }

    if (formData.totalFees && isNaN(formData.totalFees)) {
      validationErrors.totalFees = "Total Fees must be a valid number";
    }

    if (!formData.dueDate) {
      validationErrors.dueDate = "Due Date is required";
    }

    return validationErrors;
  };

  const addFeeRecord = async (record) => {
    try {
      let id = record.student_id;
      let payload = record;
      delete payload.student_id;
      console.log(`Payload:: ${JSON.stringify(payload)}`)
      const response = await axios.post(`http://127.0.0.1:5000/api/students/fees-history/${id}`, payload,{ withCredentials:true });
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
      console.log("Fees remarks data: ", formData);
      alert("Form Submitted Successfully!");
      setFormData({
        studentId: "",
        feeType: "",

        paymentDate: "",
        remarks: "",
        date: new Date().toISOString().split("T")[0],
        amountPaid: "",
        totalFees: "",
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
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.feeType ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Fee Type</option>
              <option value="tutition">Tuition</option>
              <option value="hostel">Hostel</option>
              <option value="pta">PTA</option>
              <option value="activities">Activities</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            {errors.feeType && <p className="text-red-500 text-sm mt-1">{errors.feeType}</p>}
          </div>



          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.paymentDate ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.paymentDate && <p className="text-red-500 text-sm mt-1">{errors.paymentDate}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.date ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Amount Paid */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.amountPaid ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.amountPaid && (
              <p className="text-red-500 text-sm mt-1">{errors.amountPaid}</p>
            )}
          </div>

          {/* Total Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Fees</label>
            <input
              type="number"
              name="totalFees"
              value={formData.totalFees}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.totalFees ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.totalFees && (
              <p className="text-red-500 text-sm mt-1">{errors.totalFees}</p>
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

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.remarks ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.remarks && <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>}
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

export default FeesRemarksCreateForm;