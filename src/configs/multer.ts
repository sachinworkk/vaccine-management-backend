import fs from "fs";
import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    if (!fs.existsSync(`src/assets/uploads`)) {
      fs.mkdirSync(`src/assets/uploads`, { recursive: true });
    }

    if (file) {
      cb(null, `src/assets/uploads`);
    } else {
      cb(new Error("Multer Error!"), "");
    }
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    if (file) {
      cb(null, Date.now() + "_" + file.originalname);
    } else {
      cb(new Error("Multer Error!"), "");
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
