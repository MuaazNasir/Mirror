import { Router } from "express";
import { checkUser } from "../controllers/AuthController.js";
import { onBoardCheck } from "../controllers/AuthController.js";
import { getContacts } from "../controllers/AuthController.js";
import { generateToken } from "../controllers/AuthController.js";

const router = Router()

router.post('/check-user', checkUser);
router.post('/on-board-check', onBoardCheck);
router.post('/get-contacts', getContacts);
router.get("/generate-token/:userId", generateToken)

export default router;