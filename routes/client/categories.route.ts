import { Router } from "express";
import * as controller from "../../controller/client/categories.controller";
const router: Router = Router();



router.get("/", controller.index);



export const categorieRoutes: Router = router;