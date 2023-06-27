import {Router} from 'express';
const userRouter = Router();

import userController from '../controllers/user.controller.js';
import {validId,validUser} from "../middlewares/global.middlewares.js";

userRouter.post("/", userController.createUserController);
userRouter.get("/", userController.findAllUserController);
userRouter.get("/:id",validId,validUser,userController.findUserByIdController);
userRouter.patch("/:id",validId,validUser,userController.updateUserController)

export default userRouter;