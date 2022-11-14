import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.delete("/signout", userController.signOut);

export default router;
