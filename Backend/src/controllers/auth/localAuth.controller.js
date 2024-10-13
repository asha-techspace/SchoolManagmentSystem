import UserModel from '../../models/user.model.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        const userWithoutPassword = await UserModel.findById(user._id).select('-password');
        userWithoutPassword.isActive = true;
        await userWithoutPassword.save();

        const myProfile = await ProfileModel.findOne({user: user._id})
        console.log(myProfile);
        

        res.status(200)
            .cookie("token", token, cookieOptions)
            .cookie("user", {...userWithoutPassword, "isAuthenticated" : true}, cookieOptions)
            .cookie("myProfile", myProfile, cookieOptions)
            .json({
                success: true,
                message: 'Login Successfully!',
            });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const loginSuccess = async (req, res) => {
    if (req.user) {
      res.status(200).json({ message: "User Logged In", user: req.user });
    } else {
      res.status(400).json({ message: "Not Authorized" });
    }
  };