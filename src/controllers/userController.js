import { getTaskById } from "../db/teskQuery.js";
import { createUser as addUser, getUserById } from "../db/userQuery.js";
const getUrl = (req, res) => {
    res.send("Hello World! This is a user route. You can access this route by visiting http://localhost:3000/users");
};

const getUsers = async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
};

const getUser = (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(getUserById(id));
}

const createUser = (req, res) => {
    res.send(addUser(req.body));
}

export { getUrl, getUsers, getUser, createUser };