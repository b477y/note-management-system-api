import { asyncHandler } from "../../../utils/response/error.response.js";
import { userModel } from "../../../db/models/user.model.js";
import * as dbService from "../../../db/db.service.js";
import { successResponse } from "../../../utils/response/success.response.js";
import {
  compareHash,
  generateHash,
} from "../../../utils/security/hash.security.js";
import {
  generateToken,
  verifyToken,
} from "../../../utils/security/token.security.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { blackListTokenModel } from "../../../db/models/blackListTokens.model.js";

/**
 * Register:
 * email, password, confirmPassword.
 * We check if this email registered or not.
 * If the this email associated with account the user will can't use this email in register.
 * If the this email not associated with any account the user will be able to register.
 * After this the account will be created and stored in the Database.
 */
export const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await dbService.findOne({ model: userModel, filter: { email } });

  if (user) {
    return next(
      Error("An account with this email already exists", { cause: 409 })
    );
  }

  await dbService.create({
    model: userModel,
    data: { email, password },
  });

  return successResponse({
    res,
    status: 201,
    message: "Registered successfully",
  });
});

/**
 * Login:
 * email, password.
 * We check if this user exist or not and if it existed we check if the password correct or not.
 * If the user existed and credentials are correct in this time we generate a token which inlucdes the userId after this we return the token in the response.
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await dbService.findOne({ model: userModel, filter: { email } });

  if (
    !user ||
    !compareHash({ plaintext: password, encryptedText: user.password })
  ) {
    return next(Error("Invalid credentials", { cause: 401 }));
  }

  const token = generateToken({ payload: { id: user._id } });

  return successResponse({
    res,
    status: 200,
    message: "logged in successfully",
    data: { token },
  });
});

/**
 * Forget password:
 * email.
 * Checks if the email belongs to an existing user.
 * If found, an email containing a password reset OTP is sent to the user.
 */
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new Error("Email is required", { cause: 401 }));
  }

  const user = await dbService.findOne({
    model: userModel,
    filter: { email },
  });

  if (!user) {
    return next(new Error("In-valid email address", { cause: 404 }));
  }

  emailEvent.emit("resetPassword", { id: user._id, email });

  return successResponse({
    res,
    status: 200,
    message: "Please check your email to update your password",
  });
});

/**
 * Reset password:
 * email, OTP, password(new password), confirmPassword.
 * Verifies the provided email and OTP.
 * If valid, updates the user's password and clears the OTP.
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, OTP, password } = req.body;

  const user = await dbService.findOne({
    model: userModel,
    filter: { email },
  });

  if (!user) {
    return next(
      new Error(
        "This email is not belongs to any account, please write a valid email",
        {
          cause: 404,
        }
      )
    );
  }

  if (!compareHash({ plaintext: OTP, encryptedText: user.resetPasswordOTP })) {
    return next(new Error("OTP is not correct", { cause: 400 }));
  }

  await dbService.updateOne({
    model: userModel,
    filter: { email },
    data: {
      $set: {
        password: generateHash({
          plaintext: password,
        }),
        changeCredentialsTime: new Date(),
      },
      $unset: { resetPasswordOTP: 1 },
    },
  });

  return successResponse({
    res,
    status: 200,
    message: "Password updated successfully",
  });
});

/**
 * Logout:
 * Requires authorization token in headers.
 * Invalidates the current user's JWT by adding it to a blacklist, preventing further use.
 */
export const logout = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const { jti: tokenId, exp: expiryDate } = await verifyToken({ token });

  // Mark the token as revoked
  await dbService.create({
    model: blackListTokenModel,
    data: { tokenId, expiryDate },
  });

  return successResponse({
    res,
    status: 200,
    message: "User logged out successfully",
  });
});
