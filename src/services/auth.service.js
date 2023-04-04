import user from "../models/User.js";
import jwt from "jsonwebtoken";

const loginService = (email)=>  user.findOne({email:email}).select("+password")

const generateToken=(id)=>jwt.sign({id:id},process.env.SECRET_JWT,{expiresIn:3600})
export { loginService,generateToken}