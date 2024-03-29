import userService from "../services/user.service.js";

const createUserController = async (req, res) => {
  const body = req.body;
  try {
    const token = await userService.createUserService(body);
    return res.status(201).send(token);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const findAllUserController = async (req, res) => {
  try {
    const users = await userService.findAllUserService();

    return res.send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const findUserByIdController = async (req, res) => {
  const {id: userId} = req.params;
  const userIdLogged = req.userId;
  try {
    const user = await userService.findUserByIdService(userId, userIdLogged);
    return res.send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const updateUserController = async (req, res) => {
  const {name, username, email, avatar, password, background} = req.body;
  const {id: userId} = req.params;

  const userIdLogged = req.userId;
  try {
    const response = await userService.updateUserService(
      {name, username, email, avatar, password, background},
      userId,
      userIdLogged
    );
    res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
};
