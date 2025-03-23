import dotenv from "dotenv";
dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PORT = process.env.DB_PORT;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const PORT = parseInt(process.env.PORT) || 3000;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
export const DB_DIALECT = process.env.DB_DIALECT;