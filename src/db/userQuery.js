import { queryOnDb } from "./db.js";
import { hashPassword } from "../utils/passwordUtils.js";

// Create a User table with fields:

// id: Primary key, auto-increment
// username: Unique, required
// email: Unique, required
// password: Required, hashed
// createdAt: Timestamp
// updatedAt: Timestamp

const createUserTableIfNotExist = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    return await queryOnDb(query, {
        success: "User Table created successfully",
        error: "Error in creating User table",
    });
}

const createUser = async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    const query = `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}',  '${user.password}')`;
    return await queryOnDb(query, user);
}

const getUsers = async () => {
    const query = `SELECT * FROM users`;
    return await queryOnDb(query, { success: "Users fetched successfully", error: "Error in fetching users" });
}

const removeUserById = async (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`;
    return await queryOnDb(query, { success: "User removed successfully", error: "Error in removing user" });
}

const getUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = ${id}`;
    return await queryOnDb(query, { success: "User fetched successfully", error: "Error in fetching user" });
}

const updateUserById = async (id, user) => {
    if (user.password) user.password = await hashPassword(user.password);
    const fields = Object.keys(user).map((key) => `${key} = '${user[key]}'`).join(", ");
    const query = `UPDATE users SET ${fields} WHERE id = ${id}`;
    return await queryOnDb(query, { success: "User updated successfully", error: "Error in updating user" });
}

const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    return await queryOnDb(query, { success: "User fetched successfully", error: "Error in fetching user" });
}

export { createUserTableIfNotExist, createUser, getUsers, removeUserById, getUserById, updateUserById, findUserByEmail };