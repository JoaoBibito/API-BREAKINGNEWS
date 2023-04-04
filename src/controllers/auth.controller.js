import bcrypt from "bcrypt";
import { loginService,generateToken } from "../services/auth.service.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);
    if( !user){
      return res.status(404).send({message:"User or password not found"})
    }
    
    const passowrdIsValid =  bcrypt.compareSync(password, user.password)
    if(!passowrdIsValid){
      return res.status(404).send({message:"User or password not found"})
    }

    const token = generateToken(user.id)

    res.send({token})
  }
  catch (err) {
    res.status(500).send({ Error: err.message })
  }
}
