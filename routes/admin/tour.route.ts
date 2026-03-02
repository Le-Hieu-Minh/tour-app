import { Router } from "express";
import * as controller from "../../controller/admin/tour.controller";
import * as uploadClound from "../../middlewares/admin/uploadClound.middleware";
import multer from "multer";
const router: Router = Router();

const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",
  upload.fields([{ name: 'images', maxCount: 10 }]),
  uploadClound.uploadFields
  , controller.creatPost);




export const tourRoutes: Router = router;