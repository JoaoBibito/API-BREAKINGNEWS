import {Router} from "express";
const router = Router();

import{create,findAll} from "../controllers/news.controller.js"

router.post("/",create)

export default router