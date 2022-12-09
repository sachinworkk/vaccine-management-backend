import multer from "multer";

import { Router, Request, Response, NextFunction } from "express";

import { RequestWithUser } from "../types/requestWIthUser";

import { vaccineController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(routes.ROOT, vaccineController.getVaccines);
router.get(routes.VACCINE_ID, vaccineController.getVaccineById);

router.post(
  routes.ROOT,
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.createVaccines(req as RequestWithUser, res, next)
);

router.put(
  routes.VACCINE_ID,
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.updateVaccines(req as RequestWithUser, res, next)
);

router.delete(routes.VACCINE_ID, vaccineController.deleteVaccines);

export default router;
