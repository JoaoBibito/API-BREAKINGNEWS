import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({email: email});
const createUserRepository = (body) => User.create(body);

const findAllUserRepository = () => User.find();

const findUserByIdRepository = (id) => User.findById(id);

const updateUserRepository = (id, body) =>
 User.findOneAndUpdate(
  {_id: id},
  {
   body,
  },
  {rawResult: true}
 );

export default {
 createUserRepository,
 findAllUserRepository,
 findUserByIdRepository,
 updateUserRepository,
 findByEmailUserRepository,
};
