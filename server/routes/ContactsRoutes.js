import { Router } from "express";
import { getListContacts } from "../controllers/ContactsController.js";

const router = Router();

router.get("/get-list-contacts/:userId",getListContacts)

export default router;