import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        console.log({token})
        if(!token) {
            return res.status(401).json({
                success: false,
                message:"Unauthenicated request",
                isAuthenticated: false
            });
        };
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        const user = await UserModel.findById(decodedToken?.id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message:"Invalid token",
                isAuthenticated: false
            });
        }
        req.user = user;
        next();
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
        isAuthenticated: false,
        tokenExpired: error.expiredAt
    });
}
}