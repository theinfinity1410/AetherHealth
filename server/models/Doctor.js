import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);

const Doctor = sequelize.define("Doctor", {
    doctor_id: {
        type: DataTypes.STRING(5),  // Short unique ID instead of UUID
        defaultValue: () => nanoid(),  // Generate a new ID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Doctor;
