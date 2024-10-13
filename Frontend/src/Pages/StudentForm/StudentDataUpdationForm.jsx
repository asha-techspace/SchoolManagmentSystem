import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentDataUpdationForm = () => {
  const { id } = useParams(); // Get the student ID from the URL

  // Initial form state with the student's data
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    dob: "",
    gender: "",
    age: "",
    class: "",
    division: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Simulate fetching student data (replace with API call in real app)
  useEffect(() => {
    const mockStudentData = {
      id: id, // Use the ID from the URL
      fullName: "John Doe",
      dob: "2008-05-15",
      gender: "Male",
      age: 15,
      class: "10",
      division: "A",
      address: {
        street: "123 Main St",
        city: "Cityville",
        state: "Stateland",
        postalCode: "12345",
      },
    };

    setFormData(mockStudentData); // Load the data into the form state
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Form validation
  const validate = () => {
    let validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
    }

    if (!formData.dob.trim()) {
      validationErrors.dob = "DOB is required";
    }

    if (!formData.gender.trim()) {
      validationErrors.gender = "Gender is required";
    }

    if (!formData.age) {
      validationErrors.age = "Age is required";
    } else if (formData.age < 5 || formData.age > 100) {
      validationErrors.age = "Age must be between 5 and 100";
    }

    if (!formData.class.trim()) {
      validationErrors.class = "Class is required";
    }

    if (!formData.division.trim()) {
      validationErrors.division = "Division is required";
    }

    if (!formData.address.street.trim()) {
      validationErrors.street = "Street address is required";
    }

    if (!formData.address.city.trim()) {
      validationErrors.city = "City is required";
    }

    if (!formData.address.state.trim()) {
      validationErrors.state = "State is required";
    }

    if (!formData.address.postalCode.trim()) {
      validationErrors.postalCode = "Postal Code is required";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Updated Student Data: ", formData);
      alert("Student data updated successfully!");
      // Reset or redirect logic here
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Student Data</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student ID (non-editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Gender (Radio Buttons) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-2 space-y-2">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Other</label>
              </div>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.class ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Division</label>
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.division ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.division && <p className="text-red-500 text-sm mt-1">{errors.division}</p>}
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.street ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDataUpdationForm;
