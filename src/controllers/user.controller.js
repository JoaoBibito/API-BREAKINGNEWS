const userService = require("../services/user.service")
const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !email || !username || !password || !avatar || !background) {
    res.status(400).send({Message:"Submit all fields for registration."})
  }

  const user = await userService.create(req.body)
  if(!ser){
    return res.status(400).send({
      message:"Error creating user"
    })
  }
  res.status(201).send({
    message:"user created successfully",
    user:{
      id:user._id,
      name,
      username,
      email,
      password,
      avatar,
      background
    }
  })
}

module.exports = { create }