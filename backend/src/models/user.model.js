import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const userSchema= new mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true
  },

  password:{
    type:String,
    required:true,
    minlength:8,
  },
  refreshToken:{
    type:String,
    default:""
  },

},{
  timestamps:true,
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}



userSchema.methods.getAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "30m"
        }
    );
}

userSchema.methods.getRefreshToken = function (){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"
        }
    );
}
 const User=mongoose.model("User",userSchema)

 export default User;