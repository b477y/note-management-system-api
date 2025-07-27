import { Router } from "express";
import * as NoteService from "./services/note.service.js";
import * as Schemas from "./note.validation.js";
import { AuthenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  ValidationMiddleware(Schemas.createNote),
  AuthenticationMiddleware(),
  NoteService.createNote
);
router.delete(
  "/:id",
  ValidationMiddleware(Schemas.deleteNote),
  AuthenticationMiddleware(),
  NoteService.deleteNote
);
router.post(
  "/:id/summarize",
  ValidationMiddleware(Schemas.summarizeNote),
  NoteService.summarizeNote
);

export default router;
