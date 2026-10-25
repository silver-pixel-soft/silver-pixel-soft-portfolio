import { Router } from "express";
import {
  enquaryController,
} from "../controllers/enquari.controller.ts";

const router: Router = Router();

router.route("/enquary").post(enquaryController);

export { router };



