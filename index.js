import express from 'express';
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.routes.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json())


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
const port = process.env.PORT || 3000;

connectDatabase();
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
app.use("/swagger", swaggerRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));