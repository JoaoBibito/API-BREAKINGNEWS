const router = require("express").Router();

const swaggerUI =require("swagger-ui-express");
  const swaggerDocumentation =require("../swagger.json")


router.use("/",swaggerUI.serve);
router.get("/",swaggerUI.setup(swaggerDocumentation))
module.exports =  router

