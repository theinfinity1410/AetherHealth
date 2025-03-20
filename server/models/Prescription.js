// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';

// const Prescription1 = sequelize.define('Prescription1', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     doctorId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     patientId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     medication: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     dosage: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     instructions: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//     },
//     issuedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     },
// });

// export  default Prescription1;
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { customAlphabet } from "nanoid";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";

// Generate 5-digit unique prescription ID
const nanoid = customAlphabet("1234567890", 5);

const Prescription = sequelize.define("Prescription", {
    prescription_id: {
        type: DataTypes.STRING(5), // Short unique ID instead of UUID
        defaultValue: () => nanoid(), // Generate a new ID
        primaryKey: true,
    },
    doctor_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
            model: Doctor,
            key: "doctor_id",
        },
    },
    patient_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
            model: Patient,
            key: "patient_id",
        },
    },
    medication: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dosage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frequency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    issuedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});


export default Prescription;
