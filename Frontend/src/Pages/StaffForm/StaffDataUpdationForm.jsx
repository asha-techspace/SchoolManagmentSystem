import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal '
import { addStaff, fetchStaffsFailure, } from '../../redux/staffSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const StaffDataUpdationForm = () => {
  const { id } = useParams(); // Get id from the URL or route params

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { staff } = location.state || {}
  if (staff !== null && typeof staff === 'object' && staff.hasOwnProperty('dob')) {
    staff.dob = new Date(staff.dob).toISOString().split('T')[0];
    console.log("staff.dob", staff.dob)
  }

  const addStaffs = async (staff) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${staff.id}`, staff, { withCredentials: true });
      console.log(`add staff response:: ${JSON.stringify(response)}`)
      const data = response.data.message;
      dispatch(addStaff(data));
    } catch (err) {
      dispatch(fetchStaffsFailure(err.message));
      console.log(err)
    }
  };

  const handleConfirm = () => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.id);
    } else if (actionType === "Edit") {
      setModalOpen(false);
      addStaffs(formData);
      staff = formData;
      alert("Staff data Updated!!")
      navigate("/staffList")
    }
  };

  const closeModal = () => {
    setFormData(staff)
    setModalOpen(false);
    setCurrentRecord(null);
  };

  // Initial form data (mock data for now, replace with fetched data from backend)
  const [formData, setFormData] = useState({
    id: "", // Non-editable field
    name: "",
    email: "",
    password: "",
    role: "",
    gender: "",
    dob: "",
    experience: "",
    qualification: "",
    joiningDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Simulate fetching staff data (replace with API call)
  useEffect(() => {

    setFormData(staff);
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

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (!formData.role) {
      validationErrors.role = "Role is required";
    }

    if (!formData.gender) {
      validationErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      validationErrors.dob = "Date of Birth is required";
    }

    if (!formData.qualification.trim()) {
      validationErrors.qualification = "Qualification is required";
    }

    if (!formData.joiningDate) {
      validationErrors.joiningDate = "Joining Date is required";
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
      console.log("Updated Staff data: ", formData);
      setActionType("Edit");
      setModalOpen(true);
      // Logic for updating the data in the backend
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Data Updation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            actionType={actionType}
          />
          {/* Staff ID (Non-editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Staff ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.role ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="OfficeStaff">Office Staff</option>
              <option value="Librarian">Librarian</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.dob ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.experience ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
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
              className={`mt-1 block w-full p-2 border ${errors.qualification ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.qualification && (
              <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>
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
              className={`mt-1 block w-full p-2 border ${errors.joiningDate ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.joiningDate && (
              <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>
            )}
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.street ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.city ? "border-red-500" : "border-gray-300"
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
              className={`mt-1 block w-full p-2 border ${errors.state ? "border-red-500" : "border-gray-300"
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
              className={`mt-1 block w-full p-2 border ${errors.postalCode ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Update Staff Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffDataUpdationForm;
