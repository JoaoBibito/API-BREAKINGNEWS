import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRouter = Router();

import {
  createNewsController,
  findAllNewsController,
  topNewsController,
  findNewsByIdController,
  searchNewsByTitleController,
  byUserController,
  updateNewsController,
  eraseNewsController,
  likeNewsController,
  addCommentController,
  deleteCommentController
} from "../controllers/news.controller.js"

newsRouter.post("/", authMiddleware, createNewsController);
newsRouter.get("/", findAllNewsController);
newsRouter.get("/top", topNewsController);
newsRouter.get("/search", searchNewsByTitleController);
newsRouter.get("/byUser", authMiddleware, byUserController);
newsRouter.get("/:id", authMiddleware, findNewsByIdController);
newsRouter.patch("/:id", authMiddleware, updateNewsController);
newsRouter.delete("/:id", authMiddleware, eraseNewsController);
newsRouter.patch("/like/:id", authMiddleware, likeNewsController);
newsRouter.patch("/comment/:id", authMiddleware, addCommentController);
newsRouter.patch("/comment/:idNews/:idComment", authMiddleware, deleteCommentController)

export default newsRouter