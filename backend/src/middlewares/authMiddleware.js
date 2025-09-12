import {ApiError} from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try{
        console.log(req.cookies?.accessToken);
        const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ','');

    if(!token){
        throw new ApiError(401, "unauthorized request, please login");

    }
    console.log(token);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findById(decoded?._id).select("-password -refreshToken");

    if(!user){
        throw new ApiError(401,"invalid token");
    }
    req.user= user;
    console.log("TOKEN:", token);
console.log("DECODED:", decoded);
console.log("USER:", user);

    next();
}
catch(err){
    throw new ApiError(401,"invalid access token");
}
};