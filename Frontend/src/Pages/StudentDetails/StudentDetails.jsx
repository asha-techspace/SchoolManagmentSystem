import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal ';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {addStudent} from '../../redux/studentSlice';
import axios from 'axios';

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mock student data (In a real app, this data would come from an API)
  const [student, setStudent] = useState(location.state.student || {});
  console.log("Student for detail view", JSON.stringify(student));
  const [feesHistory, setFeesHistory] = useState(location.state.student.feesHistory || {});
  const [libraryHistory, setLibraryHistory] = useState(location.state.student.libraryHistory || {});
  const [editingFeeRow, setEditingFeeRow] = useState(null); // Track the fee row being edited
  const [editingLibraryRow, setEditingLibraryRow] = useState(null); // Track the library row being edited
  const [editingFee, setEditingFee] = useState(false); // Track the fee row being edited
  const [editingLibrary, setEditingLibrary] = useState(false); // Track the library row being edited
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'


  const calculateSummary = ()=>{
    const feesSummary = feesHistory.reduce((summary, history) => {
      const { feesType, amountpaid } = history;

      // Check if this feesType already exists in the summary
      const existing = summary.find((item) => item.feesType === feesType);

      if (existing) {
        existing.amountpaid += amountpaid; // Sum the amountPaid for the same feesType
      } else {
        // Add a new entry for the feesType if it doesn't exist
        summary.push({ feesType, amountpaid });
      }
      console.log("Summary", summary);
      return summary;
    }, [])
    console.log("Fees Summary", feesSummary)
    return feesSummary;   
  }

  const [feesSummary, setFeesSummary] = useState(()=>{
    const feesSummary = calculateSummary();
    return feesSummary;
  });

  const openDeleteModal = (fee, book) => {
    setCurrentRecord(fee, book);
    setActionType("Delete");
    setModalOpen(true);
  };

  const addStudents = async (student) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/students/${student.studentId}`, student, { withCredentials: true });
      console.log(`add student response:: ${JSON.stringify(response)}`)
      const data = response.data.message;
      //dispatch(addStudent(data));
    } catch (err) {
      //dispatch(fetchStudentsFailure(err.message));
      console.log(err)
    }
  };


  const handleConfirm = () => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.id);
    } else if (actionType === "Edit") {
      // Call your edit function, e.g., editLibraryHistory(currentRecord.id);
      console.log("Inside modal confirm", editingFeeRow)
      if(editingFee){
        student.feesHistory = feesHistory;
        addStudents(student);
        setEditingFee(null);
      }
      else if(editingLibrary){
        student.libraryHistory = libraryHistory;
        addStudents(student);
        setEditingLibrary(null);
      }
    }
    setModalOpen(false);
  };

  const closeModal = () => {

    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.id);
    } else if (actionType === "Edit") {
      // Call your edit function, e.g., editLibraryHistory(currentRecord.id);
      if(editingFeeRow){
        setFeesHistory(student.feesHistory);
      }
      else if(editingLibraryRow){
        setLibraryHistory(student.libraryHistory);
      }
    }
    
    setModalOpen(false);
    setCurrentRecord(null);

  };

  const handleEditFee = (index) => {
    setEditingFeeRow(index); // Enable editing for selected fee row
    setEditingFee(true);
  };

  const handleSaveFee = (index) => {
    setEditingFeeRow(null)// Disable editing after saving
    setActionType("Edit");
    setModalOpen(true);
    // Here you can add logic to save the changes (e.g., send data to the server)
  };

  const handleEditLibrary = (index) => {
    setEditingLibraryRow(index); // Enable editing for selected library row
    setEditingLibrary(true);
  };

  const handleSaveLibrary = (index) => {
    setEditingLibraryRow(null); // Disable editing after saving
    setActionType("Edit");
    setModalOpen(true);
    // Add logic to save changes
  };

  // const handleInputChange = (e, index, type, field) => {
  //   const value = e.target.value;

  //   if (type === 'feesHistory') {
  //     const updatedFees = [...feesHistory];
  //     updatedFees[index][field] = value;
  //     setFeesHistory(updatedFees);
  //   } else if (type === 'fees') {
  //     const updStudent = student
  //     console.log('updStudent',updStudent.fees[index][field]);
  //     updStudent.fees[index][field] = value;
  //     console.log('updStudent',updStudent);
  //     setStudent(updStudent)
      
  //   }else if (type === 'library') {
  //     const updatedLibrary = [...libraryHistory];
  //     updatedLibrary[index][field] = value;
  //     setLibraryHistory(updatedLibrary);
  //   }
  // };

  const handleInputChange = (e, index, type, field) => {
    const value = e.target.value;
  
    if (type === 'feesHistory') {
      const updatedFees = [...feesHistory];
      updatedFees[index][field] = value;
      setFeesHistory(updatedFees);
    } else if (type === 'fees') {
      // Create a new copy of the student object
      const updatedStudent = {
        ...student,
        fees: student.fees.map((fee, feeIndex) => 
          feeIndex === index ? { ...fee, [field]: value } : fee
        )
      };
      console.log('Updated Student', updatedStudent);
      setStudent(updatedStudent);
    } else if (type === 'library') {
      const updatedLibrary = [...libraryHistory];
      updatedLibrary[index][field] = value;
      setLibraryHistory(updatedLibrary);
    }
  };

  //{ "feesType": "tutiton", "amountpaid": 25000 }
  // useEffect(() => {
  //   setFeesSummary(
  //     feesHistory.reduce((summary, history) => {
  //     const { feesType, amountpaid } = history;

  //     // Check if this feesType already exists in the summary
  //     const existing = summary.find((item) => item.feesType === feesType);

  //     if (existing) {
  //       existing.amountpaid += amountpaid; // Sum the amountPaid for the same feesType
  //     } else {
  //       // Add a new entry for the feesType if it doesn't exist
  //       summary.push({ feesType, amountpaid });
  //     }
  //     console.log("Summary", summary);
  //     return summary;
  //   }, [])); 
  // }, [feesHistory])


  // if (!student) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Student Details */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center">Student Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>ID:</strong> {student.studentId}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Division:</strong> {student.division}</p>
        <p>
          <strong>Address:</strong>
          {`${student.address.street}, ${student.address.city}, ${student.address.state}, ${student.address.postalCode}`}
        </p>
      </div>

      {/* Fees Summary */}
      <h3 className="text-lg sm:text-xl font-semibold mt-8">Fees Summary</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border mt-4 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Fee Type</th>
              <th className="py-2 px-4 border">Total Fees</th>
              <th className="py-2 px-4 border">Amount Paid</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">Remarks</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.fees.length > 0 ? (
              student.fees.map((fee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">
                  {fee.feesType}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFeeRow === index ? (
                      <input
                        type="number"
                        value={fee.totalAmount}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'totalAmount')}
                        className="border p-1"
                      />
                    ) : fee.totalAmount}
                  </td>
                  <td className="py-2 px-4 border">
                  {feesSummary.find((item) => item.feesType === fee.feesType).amountpaid}
                    {/* {editingFeeRow === index ? (
                      <input
                        type="number"
                        value={feesSummary.find((item) => item.feesType === fee.feesType).amountpaid}
                        onChange={(e) => handleInputChange(e, index, 'fees', 'amountPaid')}
                        className="border p-1"
                      />
                    ) : feesSummary.find((item) => item.feesType === fee.feesType).amountpaid} */}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFeeRow === index ? (
                      <input
                        type="date"
                        value={new Date(fee.dueDate).toISOString().split('T')[0]} 
                        onChange={(e) => handleInputChange(e, index, 'fees', 'dueDate')}
                        className="border p-1"
                      />
                    ) : new Date(fee.dueDate).toISOString().split('T')[0]}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingFeeRow === index ? (
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
                    {editingFeeRow === index ? (
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

      {/* Fees History */}
      <h3 className="text-lg sm:text-xl font-semibold mt-8">Fees History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border mt-4 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Fee Type</th>
              <th className="py-2 px-4 border">Amount Paid</th>
              <th className="py-2 px-4 border">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {feesHistory.length > 0 ? (
              feesHistory.map((fee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">
                     {fee.feesType}
                  </td>
                  <td className="py-2 px-4 border">
                    {fee.amountpaid}
                  </td>
                  <td className="py-2 px-4 border">
                    {fee.date}
                  </td>
                  
                  <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                    actionType={actionType}
                  />
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
              <th className="py-2 px-4 border">Issue Date</th>
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
                    {editingLibraryRow === index ? (
                      <input
                        type="number"
                        value={book.bookId}
                        onChange={(e) => handleInputChange(e, index, 'library', 'bookId')}
                        className="border p-1"
                      />
                    ) : book.bookId}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
                      <input
                        type="text"
                        value={book.title}
                        onChange={(e) => handleInputChange(e, index, 'library', 'title')}
                        className="border p-1"
                      />
                    ) : book.title}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
                      <input
                        type="text"
                        value={book.author}
                        onChange={(e) => handleInputChange(e, index, 'library', 'author')}
                        className="border p-1"
                      />
                    ) : book.author}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
                      <input
                        type="date"
                        value={new Date(book.issueDate).toISOString().split('T')[0]}
                        onChange={(e) => handleInputChange(e, index, 'library', 'dueDate')}
                        className="border p-1"
                      />
                    ) : new Date(book.issueDate).toISOString().split('T')[0]}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
                      <input
                        type="date"
                        value={new Date(book.dueDate).toISOString().split('T')[0]}
                        onChange={(e) => handleInputChange(e, index, 'library', 'dueDate')}
                        className="border p-1"
                      />
                    ) : new Date(book.dueDate).toISOString().split('T')[0]}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
                      <input
                        type="date"
                        value={ book.returnedDate?new Date(book.returnedDate).toISOString().split('T')[0]:""} 
                        onChange={(e) => handleInputChange(e, index, 'library', 'returnedDate')}
                        className="border p-1"
                      />
                    ) :  book.returnedDate?new Date(book.returnedDate).toISOString().split('T')[0]:""}
                  </td>
                  <td className="py-2 px-4 border">
                    {editingLibraryRow === index ? (
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
                    {editingLibraryRow === index ? (
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

