import userService from "../services/user.service.js";

const createUserController = async (req, res) => {
 const body = req.body;
 try {
  const user = await userService.createUserService(body);
  return res.status(201).send(user);
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
  const {id:userId}=req.params
  const userIdLogged=req.userId
 try {
  const user = await userService.findUserByIdService(userId,userIdLogged)
  return res.send(user);
 } catch (e) {
  return res.status(500).send(e.message);
 }
};

const updateUserController = async (req, res) => {
  const body =req.body
  const userId = req.userId
  try {
 
  const response = await userService.updateUserService(
   body,userId
  );
  res.send(response);
 } catch (e) {
  return res.status(500).send(e.message);
 }
};
export default {createUserController, findAllUserController, findUserByIdController, updateUserController};
