import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import { createTask, filterByPriority, getTasks, removeTask, sortBy, queryTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post("/", authenticateUser, createTask);
router.get("/tasks", authenticateUser, getTasks);
router.put("/:id", authenticateUser, updateTask);
router.delete("/:id", authenticateUser, removeTask);
router.get("/sortBy/:sortBy/sortOrder/:sortOrder", authenticateUser, sortBy);
router.get("/filterBy/:filterBy/filterOn/:filterOn", authenticateUser, filterByPriority);
router.get("/query", authenticateUser, queryTask);

export default router;
