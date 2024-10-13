// src/components/StudentDetail.jsx
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
      { id: 1, fullname: 'John Doe', age: 18, class: '12A' },
      { id: 2, fullname: 'Jane Smith', age: 17, class: '11B' },
      { id: 3, fullname: 'Samuel Green', age: 19, class: '12C' },
      { id: 4, fullname: 'Asha Baburaj', age: 18, class:'12G'},
      { id: 5, fullname: 'Arjun B S', age: 18, class:'12G'},
    ];

    const mockFeesHistory = [
      { studentId: 1, type: 'Tuition', amount: 2000, paymentDate: '2024-01-15', remarks: 'Paid' },
      { studentId: 1, type: 'Library', amount: 150, paymentDate: '2024-01-20', remarks: 'Paid' },
      { studentId: 2, type: 'arts', amount: 150, paymentDate: '2024-01-20', remarks: 'Paid' },
      { studentId: 3, type: 'Tuition', amount: 2000, paymentDate: '2024-01-15', remarks: 'Paid' },
      { studentId: 4, type: 'Library', amount: 150, paymentDate: '2024-01-20', remarks: 'Paid' },
      { studentId: 5, type: 'arts', amount: 150, paymentDate: '2024-01-20', remarks: 'Paid' },

    ];

    const mockLibraryHistory = [
      { studentId: 1, bookName: 'Harry Potter', borrowDate: '2023-12-01', returnDate: '2023-12-20', status: 'Returned' },
      { studentId: 1, bookName: 'The Alchemist ', borrowDate: '2024-01-05', returnDate: null, status: 'Borrowed' },
      { studentId: 2, bookName: 'Harry Potter', borrowDate: '2023-12-01', returnDate: '2023-12-20', status: 'Returned' },
      { studentId: 3, bookName: 'The Alchemist ', borrowDate: '2024-01-05', returnDate: null, status: 'Borrowed' },
      { studentId: 4, bookName: 'Harry Potter', borrowDate: '2023-12-01', returnDate: '2023-12-20', status: 'Returned' },
      { studentId: 5, bookName: 'The Alchemist ', borrowDate: '2024-01-05', returnDate: null, status: 'Borrowed' },
      
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.fullname}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Class:</strong> {student.class}</p>

      {/* Fees History */}
      <h3 className="text-xl font-semibold mt-6">Fees History</h3>
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Payment Date</th>
            <th className="py-2 px-4 border">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {feesHistory.length > 0 ? (
            feesHistory.map((fee, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4 border">{fee.type}</td>
                <td className="py-2 px-4 border">{fee.amount}</td>
                <td className="py-2 px-4 border">{fee.paymentDate}</td>
                <td className="py-2 px-4 border">{fee.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No fees history found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Library History */}
      <h3 className="text-xl font-semibold mt-6">Library History</h3>
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Book Name</th>
            <th className="py-2 px-4 border">borrowDate</th>
            <th className="py-2 px-4 border">returnDate</th>
            <th className="py-2 px-4 border">status</th>
          </tr>
        </thead>
        <tbody>
          {libraryHistory.length > 0 ? (
            libraryHistory.map((book, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4 border">{book.bookName}</td>
                <td className="py-2 px-4 border">{book.borrowDate}</td>
                <td className="py-2 px-4 border">{book.returnDate}</td>
                <td className="py-2 px-4 border">{book.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No Library history found.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
  );
};

export default StudentDetails;
