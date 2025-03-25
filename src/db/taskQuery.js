import { queryOnDb } from "./db.js";



// Create a Task table with fields:

// id: Primary key, auto-increment
// title: (String, required)
// description: (Text, optional)
// priority: (String, required, values: "low", "medium", "high")
// dueDate: (Date, required)
// status: (String, required, values: "pending", "completed")
// userId: Foreign key referencing the User table
// createdAt: Timestamp
// updatedAt: Timestamp


//custom function for creating tables in database
const createTaskTableIfNotExist = async () => {
    const query = `CREATE TABLE IF NOT EXISTS tasks (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            priority ENUM('low', 'medium', 'high') NOT NULL,
            dueDate DATE NOT NULL,
            status ENUM('pending', 'completed') NOT NULL,
            userId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        );`;
    return await queryOnDb(query, {
        success: "Task Table created successfully",
        error: "Error in creating Task table",
    });
};

//custom function for creating task
const createTask = async (task) => {
    console.log(task);
    //custom query for creating task
    const query = `INSERT INTO tasks (title, description, priority, dueDate, status, userId) VALUES ('${task.title}', '${task.description}', '${task.priority}', '${task.dueDate}', '${task.status}', '${task.userId}')`;
    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "Task created successfully",
        error: "Error in creating Task",
    });
}


//custom function for updating task
const updateTaskById = async (id, task) => {
    const fields = Object.keys(task).map((key) => `${key} = '${task[key]}'`).join(", ");
    //custom query for updating task
    const query = `UPDATE tasks SET ${fields} WHERE id = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "Task updated successfully",
        error: "Error in updating Task",
    });
}

//custom function for removing task
const removeTaskById = async (id) => {
    //custom query for removing task
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "Task removed successfully",
        error: "Error in removing Task",
    })
}

//custom function for getting task
const getTaskByUserId = async (userId) => {
    //custom query for getting task
    const query = `SELECT * FROM tasks WHERE userId = ${userId}`;
    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "Tasks fetched successfully",
        error: "Error in fetching tasks",
    });
}

//custom function for getting task
const getTaskById = async (id) => {
    //custom query for getting task
    const query = `SELECT * FROM tasks WHERE userId = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "Tasks fetched successfully",
        error: "Error in fetching tasks",
    });
}

//custom function for sorting task
const sortBy = async (userId, sortBy, sortOrder = "ASC") => {
    //custom query for sorting task
    const query = `SELECT * FROM tasks WHERE userId = ${userId} ORDER BY ${sortBy} ${sortOrder}`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "task fetched in sorting order", error: "error in fetching in sorting order" });
}

//custom function for filtering task
const filterByPriority = async (userId, filterBy, filterOn) => {
    //custom query for filtering task
    const query = `SELECT * FROM tasks WHERE userId = ${userId} AND ${filterBy}= '${filterOn}'`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: `task fetched by ${filterBy}: ${filterOn}`, error: "error in fetching by filter" });
}

//exporting the methods
export { createTaskTableIfNotExist, createTask, updateTaskById, removeTaskById, getTaskByUserId, getTaskById, sortBy, filterByPriority };