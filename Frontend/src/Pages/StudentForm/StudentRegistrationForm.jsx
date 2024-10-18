import React, { useState } from "react";
import {addStudent,fetchStudentsFailure,} from '../../redux/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegistrationForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
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

    if (!formData.name.trim()) {
      validationErrors.name = "Full Name is required";
    }

    if (!formData.dob.trim()) {
      validationErrors.dob = "DOB is required";
    }
    if (!formData.gender.trim()) {
      validationErrors.gender = "Gender is required";
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

  const addStudents = async (student) => {
    try {
      const response = await axios.post('http://localhost:5000/api/students', student, { withCredentials: true });
      console.log(`add student response:: ${JSON.stringify(response)}`)
      const data = response.data.message;
      dispatch(addStudent(data));
    } catch (err) {
      dispatch(fetchStudentsFailure(err.message));
      console.log(err)
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Student data: ", formData);
      
      addStudents(formData);
      
      // alert("Form Submitted Successfully!");
      setFormData({
        name: "",
        dob: "",
        gender: "",
        class: "",
        division: "",
        address: { street: "", city: "", state: "", postalCode: "" },
      });
      navigate('/studentsList');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.dob ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.class ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
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
              className={`mt-1 block w-full p-2 border ${errors.division ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.division && <p className="text-red-500 text-sm mt-1">{errors.division}</p>}
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Address</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.street ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-500 focus:border-indigo-500`}

                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.postalCode ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0a4275] text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
