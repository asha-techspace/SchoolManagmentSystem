import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL

  // Mock student data (In a real app, this data would come from an API)
  const [student, setStudent] = useState(null);
  const [feesHistory, setFeesHistory] = useState([]);
  const [libraryHistory, setLibraryHistory] = useState([]);

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
      // Add more mock student data here
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
      // Add more mock fees history here
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
      // Add more mock library history here
    ];

    const selectedStudent = mockStudentData.find((s) => s.id === parseInt(id));
    if (selectedStudent) {
      setStudent(selectedStudent);
      setFeesHistory(mockFeesHistory.filter((f) => f.studentId === selectedStudent.id));
      setLibraryHistory(mockLibraryHistory.filter((l) => l.studentId === selectedStudent.id));
    }
  }, [id]);

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
            </tr>
          </thead>
          <tbody>
            {feesHistory.length > 0 ? (
              feesHistory.map((fee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">{fee.feeType}</td>
                  <td className="py-2 px-4 border">{fee.amountPaid}</td>
                  <td className="py-2 px-4 border">{fee.totalFees}</td>
                  <td className="py-2 px-4 border">{fee.paymentDate}</td>
                  <td className="py-2 px-4 border">{fee.dueDate}</td>
                  <td className="py-2 px-4 border">{fee.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No fees history found.</td>
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
            </tr>
          </thead>
          <tbody>
            {libraryHistory.length > 0 ? (
              libraryHistory.map((book, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">{book.bookId}</td>
                  <td className="py-2 px-4 border">{book.title}</td>
                  <td className="py-2 px-4 border">{book.author}</td>
                  <td className="py-2 px-4 border">{book.dueDate}</td>
                  <td className="py-2 px-4 border">{book.returnedDate || 'Not Returned'}</td>
                  <td className="py-2 px-4 border">{book.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No library history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
