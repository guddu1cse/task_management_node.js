import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config/config.js";
dotenv.config();

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


const queryOnDb = async (query, message) => {
    try {
        const res = await db.execute(query);
        console.log({ data: res[0], message: message.success, error: null });
        return { data: res[0], message: message.success, error: null };
    } catch (error) {
        console.log({ data: null, message: message.error, error: error });
        return { data: null, message: message.error, error: error };
    }
};

const queryOnDbWithParams = async (query, params = [], message = { success: "Query executed successfully", error: "Query execution failed" }) => {
    try {
        const [rows] = await db.execute(query, params);
        console.log({ data: rows, message: message.success, error: null });
        return { data: rows, message: message.success, error: null };
    } catch (error) {
        console.error("Database Error:", error);
        return { data: null, message: message.error, error };
    }
};


export { queryOnDb, queryOnDbWithParams };
