import {Router} from "express";
import userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validId, validUser} from "../middlewares/global.middlewares.js";
const userRouter = Router();
userRouter.post("/", userController.createUserController);
userRouter.get("/", userController.findAllUserController);
userRouter.use(authMiddleware, validId, validUser);
userRouter.get("/findUserById/:id?", userController.findUserByIdController);
userRouter.patch("/:id", userController.updateUserController);

export default userRouter;
