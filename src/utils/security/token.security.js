import jwt, { decode } from "jsonwebtoken";
import * as dbService from "../../db/db.service.js";
import { userModel } from "../../db/models/user.model.js";
import { nanoid } from "nanoid";
import { blackListTokenModel } from "../../db/models/blackListTokens.model.js";

export const generateToken = ({
  payload = {},
  secretKey = process.env.TOKEN_SK,
  expiresIn = process.env.EXPIRES_IN,
} = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn, jwtid: nanoid() });

  return token;
};

export const verifyToken = ({
  token,
  secretKey = process.env.TOKEN_SK,
} = {}) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

export const decodeToken = async ({ authorization = "", next = {} } = {}) => {
  if (typeof authorization !== "string") {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  const [bearer, token] = authorization.split(" ");

  if (!bearer || !token) {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  let decoded = verifyToken({
    token,
    secretKey: process.env.TOKEN_SK,
  });

  if (!decoded?.id) {
    return next(new Error("In-valid token payload", { cause: 401 }));
  }

  const isRevoked = !!(await dbService.findOne({
    model: blackListTokenModel,
    filter: { tokenId: decoded.jti },
  }));

  if (isRevoked) {
    return next(new Error("Please login first", { cause: 401 }));
  }

  const user = await dbService.findOne({
    model: userModel,
    filter: { _id: decoded.id, deletedAt: { $exists: false } },
  });

  if (!user) {
    return next(new Error("User is not exist", { cause: 404 }));
  }

  if (user.changeCredentialsTime?.getTime() >= decoded.iat * 1000) {
    return next(new Error("In-valid login credentials", { cause: 400 }));
  }

  return user;
};
