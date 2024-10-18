import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../../utils/generateToken.js'

export const addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        console.log(user)

        const latestEmpCounter = await Counter.findOne({ name : "empId" })
        let empId = 'E' + (parseInt(latestEmpCounter.seq.substring(1))+1).toString().padStart(5, '0');
        console.log(empId)
        user.id = empId

        user.save()

        latestEmpCounter.seq = empId;
        latestEmpCounter.save()

        res.status(200).json({ message: user });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        // Await the result of the query
        const users = await User.find({ role: { $in: ['OfficeStaff', 'Librarian'] } }).limit(10);;
        
        console.log(`Users: ${users}`);
        
        // Send the users in the response
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        
        // Send an error response
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;

    // Get the fields to update from the request body
    const updates = req.body;

    // Find the user by ID and update with new fields, and return the updated user
    const updatedUser = await User.findOneAndUpdate({ id: id }, updates, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update operation against the schema
      });
    // If user not found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user in the response
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
    try {
      // Get the custom user ID from the request parameters
      const { id } = req.params;
  
      // Find the user by custom userId and delete it
      const deletedUser = await User.findOneAndDelete({ id: id });
  
      // If user not found, return a 404 error
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return success response
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: error.message });
    }
  };