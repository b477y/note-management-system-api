import cors from "cors";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import noteController from "./modules/note/note.controller.js";
import connectDB from "./db/connection.js";
import { globalErrorHandling } from "./utils/response/error.response.js";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphQL/schema.js";
import { limiter } from "./utils/security/limiter.js";
import helmet from "helmet";

const bootstrap = async (app, express) => {
  app.use(cors());
  app.use(limiter);
  app.use(helmet());
  app.use(express.json());

  app.use("/graphql", createHandler({ schema }));

  app.get("/", (req, res, next) => {
    successResponse({
      res,
      status: 200,
      message: "Welcome Note Management System",
    });
  });

  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/notes", noteController);

  app.use((req, res, next) => {
    return next(Error("This router is not exist", { cause: 404 }));
  });

  app.use(globalErrorHandling);

  await connectDB();
};

export default bootstrap;
