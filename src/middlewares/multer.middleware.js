import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";

export const Multer = (destination, allowedExtensions = []) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationDir = `uploads/${req.user?._id}/${destination}`;
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      cb(null, destinationDir);
    },

    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${nanoid()}${ext}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("This file type not allowed"), false);
    }
  };

  return multer({ fileFilter, storage });
};
