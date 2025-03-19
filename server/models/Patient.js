import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { customAlphabet } from "nanoid";
import Doctor from "./Doctor.js";

const nanoid = customAlphabet("1234567890", 5);

const Patient = sequelize.define("Patient", {
    patient_id: {
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
    doc_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
            model: Doctor,
            key: "doctor_id",
        },
    },
    medic_data:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    ai_recommendations: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

export default Patient;
