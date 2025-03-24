import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { SALT_ROUNDS } from "../config/config.js";
dotenv.config();

//hashing password function
const hashPassword = async (password) => {
    try {
        //generating salt
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        //hashing password
        const hashedPassword = await bcrypt.hash(password, salt);
        //return hashed password
        return hashedPassword;
    } catch (error) {
        //throw error
        throw new Error("Error hashing password");
    }
};

//comparing password hashpassword with plain password which is coming from user while login
const comparePassword = async (password, hashedPassword) => {
    try {
        //compare password
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        //throw error
        throw new Error("Error comparing password");
    }
};

//exporting functions
export { hashPassword, comparePassword };