import { Router } from "express";

import { userController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

router.post(routes.SIGN_UP, userController.signUp);

router.post(routes.SIGN_IN, userController.signIn);

router.delete(routes.SIGN_OUT, userController.signOut);

export default router;
