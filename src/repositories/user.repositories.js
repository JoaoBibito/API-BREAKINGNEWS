import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({email: email});
const createUserRepository = (body) => User.create(body);

const findAllUserRepository = () => User.find();

const findUserByIdRepository = (id) => User.findById(id);

const updateUserRepository = (
 id,
 {name, username, email, avatar, password, background}
) =>
 User.findOneAndUpdate(
  {_id: id},
  {name, username, email, avatar, password, background},
  {rawResult: true}
 );

export default {
 createUserRepository,
 findAllUserRepository,
 findUserByIdRepository,
 updateUserRepository,
 findByEmailUserRepository,
};
