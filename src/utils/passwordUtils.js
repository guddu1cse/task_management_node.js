import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { SALT_ROUNDS } from "../config/config.js";
dotenv.config();

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing password");
    }
};

export { hashPassword, comparePassword };