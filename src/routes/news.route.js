import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import{create,findAll} from "../controllers/news.controller.js"

router.post("/",authMiddleware, create);
router.get("/",findAll);

export default router