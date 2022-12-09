import { Router } from "express";

import { userController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

router.post(routes.SIGN_UP, userController.signUp);

router.post(routes.SIGN_IN, userController.signIn);

export default router;
