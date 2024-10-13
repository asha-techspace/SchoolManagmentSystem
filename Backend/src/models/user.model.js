import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name : {type:String, required: true},
  email: { type: String, unique: true },
  password : {type:String, required: true},
  role: { type: String, enum: ['Admin', 'OfficeStaff', 'Librarian'], default: 'OfficeStaff' },
  staffId: {type:String, unique: true},
  dob : {type:Date, required:true},
  gender : {type:String, enum: ['male','female','other'], required: true},
  privileges: [{ type: String }],
  qualification : {type:String, required: true},
  joiningDate: {type:Date},
  experience: {type:String},
  address: {
    street : {type: String},
    city : {type: String},
    state : {type: String},
    postalCode : {type: String},
  },
});

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default mongoose.model('User', userSchema);
