import { RequestWithUser } from "../types/requestWIthUser";
import { Router, Request, Response, NextFunction } from "express";
import { vaccineController } from "../controllers";

import storage from "../configs/multer";

const router = Router();

router.get("/", vaccineController.getVaccines);
router.post(
  "/",
  storage.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.createVaccines(req as RequestWithUser, res, next)
);
router.put(
  "/:id",
  storage.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.updateVaccines(req as RequestWithUser, res, next)
);
router.delete("/:id", vaccineController.deleteVaccines);

export default router;
