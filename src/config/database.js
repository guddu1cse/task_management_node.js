import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_DIALECT } from "./config.js";
dotenv.config();

//sequelize configuration
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
});

export default sequelize;