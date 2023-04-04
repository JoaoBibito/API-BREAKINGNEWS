import user from "../models/User.js";

const loginService = (email)=>  user.findOne({email:email}).select("+password")

export { loginService}