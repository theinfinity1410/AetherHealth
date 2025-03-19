import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { shortToUuid } from "../utils/shortId.js";
import Doctor from "./Doctor.js";

const Patient = sequelize.define("Patient", {
    patient_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.UUID,
        allowNull: false,
        set(value) {
            const uuid = shortToUuid(value) || value; // Convert short ID to UUID
            this.setDataValue("doc_id", uuid);
        },
        references: {
            model: Doctor,
            key: "doctor_id",
        },
    },
});

export default Patient;
