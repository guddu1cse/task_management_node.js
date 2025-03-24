import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

//task model
const Task = sequelize.define("Task", {
    //primary key
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //title as string
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //description as text
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    //enum for priority
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
    },
    //date
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    //enum for status
    status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false,
    },
    //foreign key
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    //timestamps
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    //timestamps
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Task;
