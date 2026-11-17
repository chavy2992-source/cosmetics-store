import { Router } from "express";
import { validateBody } from "../Middlewares/validateJoi.middleware.js";
import { signUpSchema, signInSchema, updatePassWordSchema } from "../Validations/user.js";
// כשתכתבי את הקונטרולר של users, תייבאי מכאן את הפונקציות:
// import { signUp, signIn, updatePassword } from "../controllers/users.js";

const router = Router();

// כשתשלימי את controllers/users.js, תסירי את סימני ההערה (//) מהשורות הבאות:
// router.post("/signup", validateBody(signUpSchema), signUp);
// router.post("/signin", validateBody(signInSchema), signIn);
// router.put("/password", validateBody(updatePassWordSchema), updatePassword);

export default router;