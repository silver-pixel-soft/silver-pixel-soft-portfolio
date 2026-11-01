import { Router } from "express";
import {
  writeReview, getAllReview
} from "../controllers/review.controller.ts";

const router: Router = Router();

router.route("/review").post(writeReview);
router.route("/get-review").get(getAllReview);

export { router };



