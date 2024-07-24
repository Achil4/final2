import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";

const router = Router()

router.post('/register',validateSchema(registerSchema) ,register)
router.post('/login', validateSchema(loginSchema) ,login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile',auth, profile)
export default router