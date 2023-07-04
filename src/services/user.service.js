import userRepositories from "../repositories/user.repositories.js";
import {generateToken} from "./auth.service.js";

const createUserService = async (body) => {
  const {
    name,
    username,
    email,
    password,
    avatar,
    background,
   }=body
 if (!name || !email || !username || !password || !avatar || !background)
  throw new Error("Submit all fields for registration.");
 const foundUser = userRepositories.findByEmailUserRepository(email);
 if (foundUser) throw new Error("User already exists");

 const user = await userRepositories.createUserRepository(body);
 if (!user) throw new Error("Error creating user");

 const token = generateToken(user.id);
 return {
  user: {
   id: user._id,
   name,
   username,
   email,
   avatar,
   background,
  },
  token,
 };
};

const findAllUserService = async () => {
 const users = await userRepositories.findAllUserRepository();

 if (users.length === 0) throw new Error("There are no registered users");
 return users;
};

const findUserByIdService = async (userId, userIdLogged) => {
 let idParam;
 if (!userId) {
  userId = userIdLogged;
  idParam = userId;
 } else {
  idParam = userId;
 }
 if (!idParam)
  throw new Error("Send an id in the parameters to search for the user");

 const user = await userRepositories.findUserByIdRepository(idParam);
 return user;
};

const updateUserService = async (body, userId
) => {
  const  {name, username, email, password, avatar, background}=body 
 if (!name && !email && !username && !password && !avatar && !background)
  throw new Error("Submit at least one field for update");

 const user = await userRepositories.findUserByIdRepository(id);
 if (user._id != userId) throw new Error("You cannot update this user");

 if (password) password = await bcrypt.hash(password, 10);

 await userRepositories.updateUserRepository(
  userId,
  body
 );
 return {message: "User successfully updated"};
};

export default {
 createUserService,
 findAllUserService,
 findUserByIdService,
 updateUserService,
};
