import env from "./config.js";
import { Sequelize } from "sequelize";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = env;
//sequelize configuration
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
});

export default sequelize;
