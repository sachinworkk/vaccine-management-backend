import { RequestWithUser } from "../types/requestWIthUser";
import { Router, Request, Response, NextFunction } from "express";
import { vaccineController } from "../controllers";

import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", vaccineController.getVaccines);
router.post(
  "/",
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.createVaccines(req as RequestWithUser, res, next)
);
router.put(
  "/:id",
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.updateVaccines(req as RequestWithUser, res, next)
);
router.delete("/:id", vaccineController.deleteVaccines);

export default router;
