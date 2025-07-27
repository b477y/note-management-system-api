import { asyncHandler } from "../../../utils/response/error.response.js";
import { successResponse } from "../../../utils/response/success.response.js";
import * as dbService from "../../../db/db.service.js";
import { userModel } from "../../../db/models/user.model.js";

/**
 * Upload Profile Picture:
 * Requires user authentication.
 * Updates the authenticated user's profile picture URL in the database with the path of the uploaded file.
 */
export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
  await dbService.findByIdAndUpdate({
    model: userModel,
    id: req.user._id,
    data: { profilePicture: req.file.path },
  });

  return successResponse({
    res,
    status: 200,
    message: "Profile picture uploaded",
  });
});
