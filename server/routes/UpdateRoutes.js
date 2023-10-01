import { Router } from "express";
import { updateUser } from "../controllers/UpdateController.js";

const router = Router();

router.post("/update-user",updateUser)

export default router;