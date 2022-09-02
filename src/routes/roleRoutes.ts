import { Router } from "express";
import roleController from "../controllers/roleController";

const router = Router();

router.post("/add", roleController.add);
router.get("/add", roleController.test);

export default router;
