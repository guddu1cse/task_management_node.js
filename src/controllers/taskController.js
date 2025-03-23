import { createTask as addTask, getTaskById, removeTaskById, updateTaskById, sortBy as sorting, filterByPriority as filterOnPriority } from "../db/teskQuery.js";
import { queryOnDb, queryOnDbWithParams } from "../db/db.js";

const createTask = async (req, res) => {
    const task = req.body;
    task.userId = req.user.id;
    const data = await addTask(task);
    res.status(200).json(data);
}

const getTasks = async (req, res) => {
    const userId = req.user.id;
    const data = await getTaskById(userId);
    res.status(200).json(data);
}

const updateTask = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = req.body;
    const data = await updateTaskById(taskId, task);
    res.status(200).json(data);
}

const removeTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await removeTaskById(id);
    res.status(200).json(data);
}

const sortBy = async (req, res) => {
    const userId = req.user.id;
    const { sortBy, sortOrder } = req.params;
    const data = await sorting(userId, sortBy, sortOrder);
    res.status(200).json(data);
}

const filterByPriority = async (req, res) => {
    const userId = req.user.id;
    const { filterBy, filterOn } = req.params;
    const data = await filterOnPriority(userId, filterBy, filterOn);
    res.status(200).json(data);
}

const queryTask = async (req, res) => {
    try {
        const { sortBy, sortOn = "ASC", filterBy, filterOn, dateStart, dateEnd, pageSize = 10, pageNumber = 1 } = req.query;
        const userId = req.user.id;
        let sql = `SELECT * FROM tasks WHERE userId = ${userId}`;

        if (filterBy && filterOn) {
            sql += ` AND ${filterBy} = '${filterOn}'`;
        }

        if (dateStart && dateEnd) {
            sql += ` AND dueDate BETWEEN ${dateStart} AND ${dateEnd}`;
        }

        if (sortBy) {
            sql += ` ORDER BY ${sortBy} ${sortOn}`;
        }
        const offset = (parseInt(pageNumber) - 1) * parseInt(pageSize);
        sql += ` LIMIT ${parseInt(pageSize)} OFFSET ${(parseInt(pageNumber) - 1) * parseInt(pageSize)}`;

        const data = await queryOnDb(sql, { success: "tasks fetched", error: "failed to fetch tasks" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export { createTask, getTasks, updateTask, removeTask, sortBy, filterByPriority, queryTask };