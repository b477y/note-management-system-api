import { Router } from "express";
import { AuthenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { Multer } from "../../middlewares/multer.middleware.js";
import * as UserService from "./services/user.service.js";
import { ImageExtensions } from "../../constants/constants.js";

const router = Router();

router.patch(
  "/upload-profile-pic",
  AuthenticationMiddleware(),
  Multer("profilePictures", ImageExtensions).single("profilePicture"),
  UserService.uploadProfilePicture
);

export default router;
