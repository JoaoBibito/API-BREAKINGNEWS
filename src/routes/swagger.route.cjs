import {Router} from "express";

import swaggerUI from "swagger-ui-express";
import swaggerDocumentation from "../swagger.json" assert {type:"json"};

const swaggerRouter = Router();
swaggerRouter.use("/", swaggerUI.serve);
swaggerRouter.get("/", swaggerUI.setup(swaggerDocumentation));

export default swaggerRouter;
