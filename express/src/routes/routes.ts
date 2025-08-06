import { Router } from "express";
import { getAuthor } from "../controllers/controllers";

const router = Router();

router.get("/:id", getAuthor);

export default router;
