import { Router } from "express";
import {
  aiAssistant,
} from "../controllers/ai.controller.ts";

const router: Router = Router();

router.route("/ai-assistant").post(aiAssistant);

export { router };
