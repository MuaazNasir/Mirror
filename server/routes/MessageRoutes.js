import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/MessageController.js";

const router = Router();

router.post('/add-message',sendMessage)
router.get('/get-messages/:from/:to',getMessages)


export default router