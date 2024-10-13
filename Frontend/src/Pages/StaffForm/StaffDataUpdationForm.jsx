import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StaffDataUpdationForm = () => {
  const { staffId } = useParams(); // Get staff ID from URL

  // Initial form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    address: "",
    joiningDate: "",
    dateOfBirth: "",
    qualification: "",
    yearOfJoining: "",
  });

  const [errors, setErrors] = useState({});

  // Mock data fetching for the staff details (replace with API call in real app)
  useEffect(() => {
    const mockStaffData = {
      staffId: 1,
      name:"Alice Johnson",
      role: "Office Staff",
      address: "123 Main St",
      joiningDate: "2022-05-15",
      dateOfBirth: "1985-07-20",
      qualification: "MBA",
      yearOfJoining: 2022,
    };

    if (parseInt(staffId) === mockStaffData.staffId) {
      setFormData(mockStaffData);
    }
  }, [staffId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let validationErrors = {};
    
    if (!formData.name.trim()) {
        validationErrors.name = "Name is required";
      }
    if (!formData.role) {
      validationErrors.role = "Role is required";
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (!formData.joiningDate) {
      validationErrors.joiningDate = "Joining Date is required";
    }

    if (!formData.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.qualification.trim()) {
      validationErrors.qualification = "Qualification is required";
    }

    if (!formData.yearOfJoining) {
      validationErrors.yearOfJoining = "Year of Joining is required";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Updated Staff data: ", formData);
      alert("Staff Data Updated Successfully!");
      // Reset form after successful submission or redirect as needed
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Data Updation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            {/*name*/}
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Role</option>
              <option value="Office Staff">Office Staff</option>
              <option value="Librarian">Librarian</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.joiningDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.joiningDate && (
              <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.qualification ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.qualification && (
              <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>
            )}
          </div>

          {/* Year of Joining */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year of Joining</label>
            <input
              type="number"
              name="yearOfJoining"
              value={formData.yearOfJoining}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.yearOfJoining ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.yearOfJoining && (
              <p className="text-red-500 text-sm mt-1">{errors.yearOfJoining}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Update Staff Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffDataUpdationForm;
