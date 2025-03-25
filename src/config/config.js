import dotenv from "dotenv";
dotenv.config();

const config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    PORT: parseInt(process.env.PORT) || 3000,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) || 10,
    DB_DIALECT: process.env.DB_DIALECT,
};

export default config

