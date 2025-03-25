import jwt from "jsonwebtoken";
import env from "../config/config.js";
const { JWT_SECRET } = env;



//middleware for authenticating the while login user
const authenticateUser = (req, res, next) => {
    // console.log(req.header("Authorization"));
    //getting token from header
    const token = req.header("Authorization")?.split(" ")[1];

    //if token is not provided then send error
    if (!token) {
        return res.status(401).json({ data: null, message: "Access Denied! No token provided.", error: null });
    }


    try {
        //verifying token
        const logedInUser = jwt.verify(token, JWT_SECRET);
        req.user = logedInUser; //storing user in request
        next();
    } catch (error) {
        //if token is invalid then send error
        res.status(401).json({ data: null, message: "Access Denied! Invalid token.", error: error });
    }
};

export default authenticateUser;