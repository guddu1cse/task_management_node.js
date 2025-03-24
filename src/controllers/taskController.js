import { createTask as addTask, getTaskById, removeTaskById, updateTaskById, sortBy as sorting, filterByPriority as filterOnPriority } from "../db/teskQuery.js";
import { queryOnDb } from "../db/db.js";

//create task
const createTask = async (req, res) => {
    const task = req.body;
    task.userId = req.user.id;
    //adding task
    const data = await addTask(task);
    res.status(200).json(data);
}

// get all tasks
const getTasks = async (req, res) => {
    const userId = req.user.id;
    // getting tasks
    const data = await getTaskById(userId);
    res.status(200).json(data);
}


// update task
const updateTask = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = req.body;
    // updating task
    const data = await updateTaskById(taskId, task);
    res.status(200).json(data);
}


// remove task
const removeTask = async (req, res) => {
    const id = parseInt(req.params.id);
    // removing task
    const data = await removeTaskById(id);
    res.status(200).json(data);
}


// sort task
const sortBy = async (req, res) => {
    const userId = req.user.id;
    const { sortBy, sortOrder } = req.params;
    // geting sorted task
    const data = await sorting(userId, sortBy, sortOrder);
    res.status(200).json(data);
}

// filter task
const filterByPriority = async (req, res) => {
    const userId = req.user.id;
    const { filterBy, filterOn } = req.params;
    const data = await filterOnPriority(userId, filterBy, filterOn);
    res.status(200).json(data);
}

// perform query on task like sorting, filtering and pagination
const queryTask = async (req, res) => {
    try {

        // getting query params
        const { sortBy, sortOn = "ASC", filterBy, filterOn, dateStart, dateEnd, pageSize = 10, pageNumber = 1 } = req.query;
        const userId = req.user.id;
        let sql = `SELECT * FROM tasks WHERE userId = ${userId}`;


        //filtering task according to column and value
        if (filterBy && filterOn) {
            sql += ` AND ${filterBy} = '${filterOn}'`;
        }

        //filtering task according to duedate between startDate and endDate
        if (dateStart && dateEnd) {
            sql += ` AND dueDate BETWEEN ${dateStart} AND ${dateEnd}`;
        }

        //handing sorting
        if (sortBy) {
            sql += ` ORDER BY ${sortBy} ${sortOn}`;
        }

        //handling pagination
        sql += ` LIMIT ${parseInt(pageSize)} OFFSET ${(parseInt(pageNumber) - 1) * parseInt(pageSize)}`;

        const data = await queryOnDb(sql, { success: "tasks fetched", error: "failed to fetch tasks" });

        //sending response
        res.status(200).json(data);
    } catch (error) {

        //sending error
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export { createTask, getTasks, updateTask, removeTask, sortBy, filterByPriority, queryTask };