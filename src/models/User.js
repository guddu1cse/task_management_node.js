import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { hashPassword } from "../utils/passwordUtils.js";

//user model
const User = sequelize.define("User", {
    //primary key
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //username as string
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    //email as email
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    //password as string before saving it will hashed it
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
}, {
    //hooks
    hooks: {
        //before creating user hashing the password from row password
        beforeCreate: async (user) => {
            //checking password is valid
            if (user.password) {
                //hashing password
                user.password = await hashPassword(user.password);
            }
        },
    },
});

export default User;