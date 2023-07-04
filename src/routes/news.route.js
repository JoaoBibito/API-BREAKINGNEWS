import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRouter = Router();

import {
  createNewsController,
  findAllNewsController,
  topNewsController,
  findByIdController,
  searchByTitleController,
  byUserController,
  updateController,
  eraseController,
  likeNewsController,
  addCommentController,
  deleteCommentController
} from "../controllers/news.controller.js"

newsRouter.post("/", authMiddleware, createNewsController);
newsRouter.get("/", findAllNewsController);
newsRouter.get("/top", topNewsController);
newsRouter.get("/search", searchByTitleController);
newsRouter.get("/byUser", authMiddleware, byUserController);
newsRouter.get("/:id", authMiddleware, findByIdController);
newsRouter.patch("/:id", authMiddleware, updateController);
newsRouter.delete("/:id", authMiddleware, eraseController);
newsRouter.patch("/like/:id", authMiddleware, likeNewsController);
newsRouter.patch("/comment/:id", authMiddleware, addCommentController);
newsRouter.patch("/comment/:idNews/:idComment", authMiddleware, deleteCommentController)

export default newsRouter