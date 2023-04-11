import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import{create,findAll,topNews,findById,searchByTitle} from "../controllers/news.controller.js"

router.post("/",authMiddleware, create);
router.get("/",findAll);
router.get("/top",topNews);
router.get("/search", searchByTitle);
router.get("/byUser", byUser)

router.get("/:id",authMiddleware, findById);


export default router