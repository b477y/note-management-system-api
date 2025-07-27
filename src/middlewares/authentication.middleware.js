import { asyncHandler } from "../utils/response/error.response.js";
import { decodeToken } from "../utils/security/token.security.js";

export const AuthenticationMiddleware = () => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(
        new Error("Authorization header is required", { cause: 401 })
      );
    }
    req.user = await decodeToken({
      authorization,
      next,
    });
    return next();
  });
};
