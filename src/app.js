import express from 'express';
import connectDatabase from "./database/db.js";
import "dotenv/config.js";
import cors from "cors";
import router from './routes/index.js';

const app = express();

connectDatabase();
app.use(express.json())
app.use(cors())
app.use(router)

export default app