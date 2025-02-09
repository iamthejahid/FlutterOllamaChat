import { Router } from "express";
// Controller
import {
    textChat,
} from "@main/controllers/chat.controller";
// Middleware

import { chatValidation } from "@main/validations/chat.validation";
// Validation

const router = Router();

router.post("/textChat", chatValidation, textChat);

export default router;