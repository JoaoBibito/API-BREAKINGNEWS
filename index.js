require("dotenv").config();
const express = require("express");
const userRoute = require("./src/routes/user.routes");
const connectDatabase =require("./src/database/db");

const app = express();
const port = 3000;

connectDatabase();
app.use(express.json())
app.use("/user", userRoute)

app.listen(port,()=>  console.log(`Servidor rodando na porta ${port}`));