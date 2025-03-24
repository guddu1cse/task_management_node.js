import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js'; //importing middleware for authenticating the user
import { createTask, filterByPriority, getTasks, removeTask, sortBy, queryTask, updateTask } from '../controllers/taskController.js'; //importing controllers

// router
const router = express.Router();


//protected routes
//setting up routes
router.post("/", authenticateUser, createTask);
//getting all the tasks related to logged in user
router.get("/tasks", authenticateUser, getTasks);
//getting single task
router.put("/:id", authenticateUser, updateTask);
//deleting single task
router.delete("/:id", authenticateUser, removeTask);
//sorting task
router.get("/sortBy/:sortBy/sortOrder/:sortOrder", authenticateUser, sortBy);
//filtering task
router.get("/filterBy/:filterBy/filterOn/:filterOn", authenticateUser, filterByPriority);
//getting task by queryed params
router.get("/query", authenticateUser, queryTask);

export default router;
