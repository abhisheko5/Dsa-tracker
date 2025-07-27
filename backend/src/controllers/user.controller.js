import User from "../models/user.model.js";
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from "../utils/apiResponse.js"
import {generateAccessandRefreshToken } from '../services/authService.js';


const registerUser = async(req,res)=>{

  const{name,email ,password}=req.body;

  if(!name || !email || !password){
    throw new ApiError(400,"please provide all details");
  }
  
  const ExistingUser= await User.findOne({email});

  if(ExistingUser){
    throw new ApiError(400,"user already exists")
  }


  const user = new User({
    name,
    email,
    password,

  })
  
  await user.save();

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

const option={
    httpOnly: true,
    secure: true, 
}

res
  .status(201)
  .cookie("accessToken", accessToken, option)
  .cookie("refreshToken", refreshToken, option)
  .json(
     new ApiResponse(201,user,"user resgistered successfully")
  )
}
const loginUser = async(req,res)=>{
  const{email,password} = req.body;
  if(!email || !password){
    throw new ApiError(400,"all fields required")
    }

  const user = await User.findOne({email});
  if(!user){
    throw new ApiError(400,"no user found");
    }


  const matchpassword = await user.comparePassword(password);
  if(!matchpassword){
    throw new ApiError(400,"invalid credantials")
    }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
  
  const option={
    httpOnly: true,
    secure: true, 
  }

  res
  .status(200)
  .cookie("accessToken", accessToken,option)
  .cookie("refreshToken", refreshToken, option) 
  .json(
          new ApiResponse(200,user,"user loggedin successfully")
  )
}


export {registerUser,loginUser};