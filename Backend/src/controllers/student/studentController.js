import Student from '../../models/student.model.js';
import Counter from '../../models/counter.model.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../../utils/generateToken.js'

export const addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        console.log(student)

        const latestStudentCounter = await Counter.findOne({ name : "studentId" })
        let studentId = 'S' + (parseInt(latestStudentCounter.seq.substring(1))+1).toString().padStart(5, '0');
        console.log(studentId)
        student.studentId = studentId

        student.save()

        latestStudentCounter.seq = studentId;
        latestStudentCounter.save()

        res.status(200).json({ message: student });

    } catch (error) {
        console.error('Error while adding student:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getStudents= async (req, res) => {
    try {
        // Await the result of the query
        const student = await Student.find().limit(10);;
        
        console.log(`Students: ${student}`);
        
        // Send the students in the response
        res.status(200).json({ student });
    } catch (error) {
        console.error('Error fetching students:', error);
        
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};

export const getStudent = async (req, res) => {
  try {
      const studentId = req.params.studentId;  // Get from route params

      // Find the student by studentId
      const student = await Student.findOne({ studentId });
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json(student);
  } catch (error) {
      console.error('Error fetching library record:', error);
      res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    // Get the student ID from the request parameters
    const { id } = req.params;

    // Get the fields to update from the request body
    const updates = req.body;

    // Find the student by ID and update with new fields, and return the updated student
    const updatedStudent = await Student.findOneAndUpdate({ studentId: id }, updates, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update operation against the schema
      });
    // If student not found, return a 404 error
    if (!updatedStudent) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated student in the response
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error('Error updating student details:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
    try {
      // Get the custom student ID from the request parameters
      const { id } = req.params;
  
      // Find the student by custom studentId and delete it
      const deletedUser = await Student.findOneAndDelete({ studentId: id });
  
      // If student not found, return a 404 error
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return success response
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: error.message });
    }
  };

export const getLibraryEntry = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const student = await Student.findOne({ studentId: studentId },
      );
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student.libraryHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const addLibraryEntry = async (req, res) => {
  try {
    const { studentId } = req.params;
    const newLibraryEntry = req.body;

    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { $push: { libraryHistory: newLibraryEntry } },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student.libraryHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing library entry by library entry ID
export const updateLibraryEntry = async (req, res) => {
  try {
    const { studentId, transId } = req.params;
    const updatePayload  = req.body;

    const updateObject = {};
    for (const key in updatePayload) {
        updateObject[`libraryHistory.$.${key}`] = updatePayload[key];  // Dynamically add fields to the update object
    }

    const student = await Student.findOneAndUpdate(
      { studentId: studentId, 'libraryHistory._id': transId },
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or library entry not found' });
    }

    res.status(200).json(student.libraryHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a library entry by library entry ID
export const deleteLibraryEntry = async (req, res) => {
  try {
    const { studentId, transId } = req.params;
    
    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { $pull: { libraryHistory: { _id: transId } } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or library entry not found' });
    }

    res.status(200).json({ message: `Library entry deleted successfully - ${studentId}, ${transId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLibraryRecord = async (req, res) => {
  try {
      const studentId = req.params.studentId;  // Get from route params

      // Find the student by studentId
      const student = await Student.findOne({ studentId });
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      // Find the specific library entry within the student's libraryHistory
      const libraryEntry = student.libraryHistory;
      if (!libraryEntry) {
          return res.status(404).json({ message: 'Library entry not found' });
      }

      res.status(200).json(libraryEntry);
  } catch (error) {
      console.error('Error fetching library record:', error);
      res.status(500).json({ message: error.message });
  }
};

// Add a new fees transaction
export const addFeesTransaction = async (req, res) => {
  try {
    const { studentId } = req.params;
    const newFeesTransaction = req.body;

    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { $push: { feesHistory: newFeesTransaction } },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student.feesHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeesTransactions= async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId: studentId },
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student.feesHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing fees transaction by transaction ID
export const updateFeesTransaction = async (req, res) => {
  try {
    const { studentId, transId } = req.params;
    const updatedTransaction = req.body;

    const updateObject = {};
    for (const key in updatedTransaction) {
        updateObject[`feesHistory.$.${key}`] = updatedTransaction[key];  // Dynamically add fields to the update object
    }

    const student = await Student.findOneAndUpdate(
      { studentId: studentId, 'feesHistory._id': transId },
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or fees transaction not found' });
    }

    res.status(200).json(student.feesHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a fees transaction by transaction ID
export const deleteFeesEntry = async (req, res) => {
  try {
    const { studentId, transId } = req.params;
    
    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { $pull: { feesHistory: { _id: transId } } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or fees entry not found' });
    }

    res.status(200).json({ message: `Fees transaction deleted successfully - ${studentId}, ${transId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeesSection = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedFees = req.body.fees;

    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { fees: updatedFees },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student.fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFees = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log("Fees Payload: ",req.body);
    const updatedFees = req.body;

    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const feeIndex = student.fees.findIndex(fee => fee.feesType === updatedFees.feesType);

    if (feeIndex !== -1) {
      // If the entry exists, replace it with the updatedFees object
      student.fees[feeIndex] = updatedFees;
    } else {
      // If it doesn't exist, append the updatedFees to the fees array
      student.fees.push(updatedFees);
    }

    await student.save();
    
    res.status(200).json({ message: 'Fees updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFees = async (req, res) => {
  try {
    const { studentId, transId } = req.params;
    
    const student = await Student.findOneAndUpdate(
      { studentId: studentId },
      { $pull: { fees: { _id: transId } } },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student or fees entry not found' });
    }

    res.status(200).json({ message: `Fees transaction deleted successfully - ${studentId}, ${transId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};