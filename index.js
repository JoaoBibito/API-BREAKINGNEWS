import dotenv from "dotenv";
import express from 'express';
import userRoute from "./src/routes/user.routes.js";
import connectDatabase from "./src/database/db.js";
dotenv.config();

const app = express();
const port = 3000;

connectDatabase();
app.use(express.json())
app.use("/user", userRoute)

app.listen(port,()=>  console.log(`Servidor rodando na porta ${port}`));