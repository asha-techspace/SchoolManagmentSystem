import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  feesHistory: [
    {
      amount: Number,
      date: Date,
      remarks: String,
    },
  ],
  libraryHistory: [
    {
      bookName: String,
      borrowDate: Date,
      returnDate: Date,
      status: String, // Borrowed/Returned
    },
  ],
});

export default mongoose.model('Student', studentSchema);
