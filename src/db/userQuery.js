import { queryOnDb } from "./db.js";
import { hashPassword } from "../utils/passwordUtils.js";

// Create a User table with fields:

// id: Primary key, auto-increment
// username: Unique, required
// email: Unique, required
// password: Required, hashed
// createdAt: Timestamp
// updatedAt: Timestamp

//custom function for creating tables in database
const createUserTableIfNotExist = async () => {
    //custom query for creating table
    const query = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    //geting data from data bases and return
    return await queryOnDb(query, {
        success: "User Table created successfully",
        error: "Error in creating User table",
    });
}

//custom function for creating user
const createUser = async (user) => {
    //getting hashed password before saving records in database
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    //custom query for creating user
    const query = `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}',  '${user.password}')`;
    //geting data from data bases and return
    return await queryOnDb(query, user);
}

//custom function for getting users
const getUsers = async () => {
    //custom query for getting users
    const query = `SELECT * FROM users`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "Users fetched successfully", error: "Error in fetching users" });
}

//custom function for removing user
const removeUserById = async (id) => {
    //custom query for removing user
    const query = `DELETE FROM users WHERE id = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "User removed successfully", error: "Error in removing user" });
}

//custom function for getting user
const getUserById = async (id) => {
    //custom query for getting user
    const query = `SELECT * FROM users WHERE id = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "User fetched successfully", error: "Error in fetching user" });
}

//custom function for updating user
const updateUserById = async (id, user) => {
    //checking if password is updated in the user the again hashing password before saving tha data
    if (user.password) user.password = await hashPassword(user.password);
    //mapping the keys and value to write query effciently
    const fields = Object.keys(user).map((key) => `${key} = '${user[key]}'`).join(", ");
    //custom query for updating user
    const query = `UPDATE users SET ${fields} WHERE id = ${id}`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "User updated successfully", error: "Error in updating user" });
}

//custom function for finding user
const findUserByEmail = async (email) => {
    //custom query for finding user
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    //geting data from data bases and return
    return await queryOnDb(query, { success: "User fetched successfully", error: "Error in fetching user" });
}

//exporting functions
export { createUserTableIfNotExist, createUser, getUsers, removeUserById, getUserById, updateUserById, findUserByEmail };