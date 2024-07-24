import { Router } from "express";
import { auth } from "../middlewares/validateToken.js";
import {getTask,getTasks,createTasks,updateTasks,deleteTasks} from '../controllers/tasks.controller.js'
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router()

router.get('/tasks', auth, getTasks)
router.get('/tasks/:id', auth,getTask)
router.post('/tasks', auth, validateSchema(createTaskSchema),createTasks)
router.delete('/tasks/:id', auth,deleteTasks)
router.put('/tasks/:id', auth,updateTasks)

export default router