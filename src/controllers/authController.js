
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../db/userQuery.js";
import { comparePassword } from "../utils/passwordUtils.js";
import env from "../config/config.js";
const { JWT_SECRET, JWT_EXPIRY } = env;

//login user logic
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (await findUserByEmail(email)).data[0];
        console.log("login user", user);

        if (!user) return res.status(404).json({ data: null, message: "User not found", error: null });

        const isValid = await comparePassword(password, user.password);
        if (!isValid) return res.status(401).json({ data: null, message: "Invalid credentials", error: null });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
        res.status(200).json({ data: { user, token }, message: "Login successful", error: null });
    } catch (error) {
        res.status(500).json({ data: null, message: "error in login", error: error });
    }
};

//get current login user profile
export const getProfile = async (req, res) => {
    try {
        const user = (await findUserByEmail(req.user.email)).data[0];
        res.status(200).json({ data: user, message: "Profile fetched successfully", error: null });
    } catch (error) {
        res.status(500).json({ data: null, message: "Error in fetching profile", error: error });
    }
};
