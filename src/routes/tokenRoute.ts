import { Router } from "express";

import { tokenController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

router.post(routes.REFRESH_TOKEN, tokenController.refreshToken);

export default router;
