// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';
// import { v4 as uuidv4 } from 'uuid';
// import Doctor from './Doctor.js';

// const Patient1 = sequelize.define('Patient1', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: uuidv4,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: { isEmail: true }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     patientId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         defaultValue: () => `PAT-${uuidv4().slice(0, 8)}` // Generates unique Patient ID
//     },
//     doctorId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         references: {
//             model: Doctor, // Linking to the Doctor model
//             key: 'doctorId'
//         }
//     }
// });

// export default Patient1;
// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// import { shortToUuid } from "../utils/shortId.js";
// import Doctor from "./Doctor.js";

// const Patient2 = sequelize.define("Patient2", {
//     patient_id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: { isEmail: true },
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     doc_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         set(value) {
//             const uuid = shortToUuid(value) || value; // Convert short ID to UUID
//             this.setDataValue("doc_id", uuid);
//         },
//         references: {
//             model: Doctor,
//             key: "doctor_id",
//         },
//     },
// });

// export default Patient2;
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