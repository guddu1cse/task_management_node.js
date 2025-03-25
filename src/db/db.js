import mysql from "mysql2/promise";
import env from "../config/config.js";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = env;



//db configurations
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


//performing queries on db
const queryOnDb = async (query, message) => {
    try {
        //executing query on db
        const res = await db.execute(query);
        console.log({ data: res[0], message: message.success, error: null });
        return { data: res[0], message: message.success, error: null };
    } catch (error) {
        console.log({ data: null, message: message.error, error: error });
        return { data: null, message: message.error, error: error };
    }
};

//handling pram queries on db
const queryOnDbWithParams = async (query, params = [], message = { success: "Query executed successfully", error: "Query execution failed" }) => {
    try {
        //executing query on db
        const [rows] = await db.execute(query, params);
        console.log({ data: rows, message: message.success, error: null });
        return { data: rows, message: message.success, error: null };
    } catch (error) {
        console.error("Database Error:", error);
        return { data: null, message: message.error, error };
    }
};



//exporting the methods
export { queryOnDb, queryOnDbWithParams };
