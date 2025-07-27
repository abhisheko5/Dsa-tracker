
import User from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';

const generateAccessandRefreshToken = async(userId) => {
  const user = await User.findById(userId);

  if(!user){
    throw new ApiError(404,"user not found");
  }
  const accessToken =  user.getAccessToken();
  const refreshToken = user.getRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave: false})

  return { accessToken, refreshToken };

}

export {generateAccessandRefreshToken};