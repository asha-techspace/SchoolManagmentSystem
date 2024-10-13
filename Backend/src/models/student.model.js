import mongoose from 'mongoose';

const feeTransactionSchema = new mongoose.Schema({
  date: {type:Date, required:true, default:Date.now},
  amountpaid: {type:Number, required:true},
})

const libraryHistorySchema = new mongoose.Schema({
      id: {type:Number, required:true},
      title: {type:String, required:true},
      author: {type:String, required:true},
      issueDate: {type:Date, required:true,default:Date.now},
      dueDate: {type:Date, required:true},
      returnedDate: {type:Date},
      status: {type:String, required:true, enum:['issued','returned'], default:'issued'}
})

const studentSchema = new mongoose.Schema({
  studentId: {type:String, unique: true},
  name : {type:String, required: true},
  dob : {type:Date, required:true},
  gender : {type:String, enum: ['male','female','other'], required: true},
  class: {type: Number, required:true},
  division: {type: String, required:true},
  address: {
    street : {type: String},
    city : {type: String},
    state : {type: String},
    postalCode : {type: String},
  },
  feesHistory: [
    {
      totalFees: {type:Number},
      feesType : {type:String, enum: ['tutiton','hostel', 'pta','activities','miscellaneous'], required: true},
      transactions: [feeTransactionSchema],
      dueDate: {type:Date},
    },
  ],
  libraryHistory: [libraryHistorySchema],
});

export default mongoose.model('Student', studentSchema);
