import {Router} from 'express';
import userController from "../controllers/user.controller.js";
import {validId,validUser} from "../middlewares/global.middlewares.js";
const userRouter = Router();
userRouter.post("/", userController.createUserController);
userRouter.get("/", userController.findAllUserController);
userRouter.get("/:id",validId,validUser,userController.findUserByIdController);
userRouter.patch("/:id",validId,validUser,userController.updateUserController)

export default userRouter;