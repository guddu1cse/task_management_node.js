import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config/config.js";
dotenv.config();


const authenticateUser = (req, res, next) => {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ data: null, message: "Access Denied! No token provided.", error: null });
    }

    try {
        const logedInUser = jwt.verify(token, JWT_SECRET);
        req.user = logedInUser;
        console.log(logedInUser);
        next();
    } catch (error) {
        res.status(401).json({ data: null, message: "Access Denied! Invalid token.", error: error });
    }
};

export default authenticateUser;
