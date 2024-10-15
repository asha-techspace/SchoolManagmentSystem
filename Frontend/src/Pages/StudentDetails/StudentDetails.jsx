import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal ';

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL

  // Mock student data (In a real app, this data would come from an API)
  const [student, setStudent] = useState(null);
  const [feesHistory, setFeesHistory] = useState([]);
  const [libraryHistory, setLibraryHistory] = useState([]);
  const [editingFee, setEditingFee] = useState(null); // Track the fee row being edited
  const [editingLibrary, setEditingLibrary] = useState(null); // Track the library row being edited
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'

  const openDeleteModal = (fee,book) => {
    setCurrentRecord(fee,book);
    setActionType("Delete");
    setModalOpen(true);
  };
  const handleConfirm = () => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.id);
    } else if (actionType === "Edit") {
      // Call your edit function, e.g., editLibraryHistory(currentRecord.id);
    }
    setModalOpen(false);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecord(null);
  };

  useEffect(() => {
    // Mock student data fetching
    const mockStudentData = [
      {
        id: 1,
        fullName: 'John Doe',
        dob: '2005-05-14',
        gender: 'Male',
        age: 18,
        class: '12A',
        division: 'A',
        address: {
          street: '123 Main St',
          city: 'Cityville',
          state: 'Stateville',
          postalCode: '12345',
        },
      },
    ];

    const mockFeesHistory = [
      {
        studentId: 1,
        feeType: 'Tuition',
        amountPaid: 2000,
        totalFees: 2500,
        paymentDate: '2024-01-15',
        dueDate: '2024-01-31',
        remarks: 'Paid',
      },
    ];

    const mockLibraryHistory = [
      {
        studentId: 1,
        bookId: 101,
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        dueDate: '2024-01-15',
        returnedDate: '2024-01-12',
        status: 'Returned',
      },
    ];

    const selectedStudent = mockStudentData.find((s) => s.id === parseInt(id));
    if (selectedStudent) {
      setStudent(selectedStudent);
      setFeesHistory(mockFeesHistory.filter((f) => f.studentId === selectedStudent.id));
      setLibraryHistory(mockLibraryHistory.filter((l) => l.studentId === selectedStudent.id));
    }
  }, [id]);

  const handleEditFee = (index) => {
    setEditingFee(index); // Enable editing for selected fee row
  };

  const handleSaveFee = (index) => {
    setEditingFee(null); // Disable editing after saving
    setActionType("Edit");
      setModalOpen(true);
    // Here you can add logic to save the changes (e.g., send data to the server)
  };

  const handleEditLibrary = (index) => {
    setEditingLibrary(index); // Enable editing for selected library row
  };

  const handleSaveLibrary = (index) => {
    setEditingLibrary(null); // Disable editing after saving
    setActionType("Edit");
      setModalOpen(true);
    // Add logic to save changes
  };

  const handleInputChange = (e, index, type, field) => {
    const value = e.target.value;

    if (type === 'fees') {
      const updatedFees = [...feesHistory];
      updatedFees[index][field] = value;
      setFeesHistory(updatedFees);
    } else if (type === 'library') {
      const updatedLibrary = [...libraryHistory];
      updatedLibrary[index][field] = value;
      setLibraryHistory(updatedLibrary);
    }
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Student Details */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center">Student Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.fullName}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Division:</strong> {student.division}</p>
        <p>
          <strong>Address:</strong> 
          {`${student.address.street}, ${student.address.city}, ${student.address.state}, ${student.address.postalCode}`}
        </p>
      </div>

      {/* Fees History */}
      <h3 className="text-lg sm:text-xl font-semibold mt-8">Fees History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border mt-4 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Fee Type</th>
              <th className="py-2 px-4 border">Amount Paid</th>
              <th className="py-2 px-4 border">Total Fees</th>
              <th className="py-2 px-4 border">Payment Date</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">Remarks</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feesHistory.length > 0 ? (
              feesHistory.map((fee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="text"
                        value={fee.feeType}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'feeType')}
                        className="border p-1"
                      />
                    ) : fee.feeType}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="number"
                        value={fee.amountPaid}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'amountPaid')}
                        className="border p-1"
                      />
                    ) : fee.amountPaid}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="number"
                        value={fee.totalFees}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'totalFees')}
                        className="border p-1"
                      />
                    ) : fee.totalFees}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="date"
                        value={fee.paymentDate}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'paymentDate')}
                        className="border p-1"
                      />
                    ) : fee.paymentDate}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="date"
                        value={fee.dueDate}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'dueDate')}
                        className="border p-1"
                      />
                    ) : fee.dueDate}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <input
                        type="text"
                        value={fee.remarks}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'remarks')}
                        className="border p-1"
                      />
                    ) : fee.remarks}
                  </td>
                  <ConfirmationModal
  isOpen={isModalOpen}
  onClose={closeModal}
  onConfirm={handleConfirm}
  actionType={actionType}
/>

                  <td className="py-2 px-4 border">
                    {editingFee === index ? (
                      <button
                        onClick={() => handleSaveFee(index)}
                        className="bg-deep-red hover:bg-red-700 text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditFee(index)}
                        className="bg-deep-blue hover:bg-blue-800 text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                      >
                        Edit
                      </button>
                    )}
                 
                  
                    <button
                     onClick={() => openDeleteModal(fee)}
                     className="bg-deep-red hover:bg-red-700 text-white text-xs sm:text-sm lg:text-base px-2 py-1 ml-4 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                     >Delete

                     </button>
                     </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No fees history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Library History */}
      <h3 className="text-lg sm:text-xl font-semibold mt-8">Library History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border mt-4 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Book ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">Returned Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {libraryHistory.length > 0 ? (
              libraryHistory.map((book, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <input
                        type="number"
                        value={book.bookId}
                        onChange={(e) => handleInputChange(e, index, 'library', 'bookId')}
                        className="border p-1"
                      />
                    ) : book.bookId}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <input
                        type="text"
                        value={book.title}
                        onChange={(e) => handleInputChange(e, index, 'library', 'title')}
                        className="border p-1"
                      />
                    ) : book.title}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <input
                        type="text"
                        value={book.author}
                        onChange={(e) => handleInputChange(e, index, 'library', 'author')}
                        className="border p-1"
                      />
                    ) : book.author}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <input
                        type="date"
                        value={book.dueDate}
                        onChange={(e) => handleInputChange(e, index, 'library', 'dueDate')}
                        className="border p-1"
                      />
                    ) : book.dueDate}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <input
                        type="date"
                        value={book.returnedDate}
                        onChange={(e) => handleInputChange(e, index, 'library', 'returnedDate')}
                        className="border p-1"
                      />
                    ) : book.returnedDate}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <select
                        value={book.status}
                        onChange={(e) => handleInputChange(e, index, 'library', 'status')}
                        className="border p-1"
                      >
                        <option value="issued">Issued</option>
                        <option value="returned">Returned</option>
                      </select>
                    ) : book.status}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibrary === index ? (
                      <button
                        onClick={() => handleSaveLibrary(index)}
                        className="bg-deep-red hover:bg-red-700 text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditLibrary(index)}
                        className="bg-deep-blue hover:bg-blue-800 text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                      >
                        Edit
                      </button>
                    )}

                       <button
                     onClick={() => openDeleteModal(book)}
                     className="bg-deep-red hover:bg-red-700 text-white text-xs sm:text-sm lg:text-base px-2 py-1 ml-4 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
                     >Delete

                     </button> 

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No library history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;

