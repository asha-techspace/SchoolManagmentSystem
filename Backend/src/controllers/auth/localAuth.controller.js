import UserModel from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../../utils/generateToken.js'


const cookieOptions = {
    httpOnly: false, 
    secure: false,      // Set to true in production with HTTPS
    sameSite: "lax",  
    maxAge: 24 * 60 * 60 * 1000
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`${email}, ${password}`)
        //if either email/password is not present return error(400)
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        //Fetch user by email and verify credentials - return 401 if not matching
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(`${user}`)

        //user authenticated, now generate jwt token
        const token = generateToken(user.id);

        //send OK response including token and user in cookie
        const userWithoutPassword = await UserModel.findOne({ id: user.id }).select('-password');
        res.status(200)
            .cookie("token", token, cookieOptions)
            .cookie("user", {...userWithoutPassword, "isAuthenticated" : true}, cookieOptions)
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

  export const logout = async (req, res) => {
    try {
        console.log(`USER::${req.user}`)
        const user = await UserModel.findById(req?.user?._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        await user.save();
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()), // Expire the cookie immediately
        }).cookie("connect.sid", "", {
            httpOnly: true,
            expires: new Date(0), 
        }).cookie("user", "", {
            httpOnly: true,
            expires: new Date(0), 
        })
        return res.status(200).json({
            success: true,
            message: "User successfully logged out"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}