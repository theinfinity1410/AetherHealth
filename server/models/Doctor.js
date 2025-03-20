// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';
// import { v4 as uuidv4 } from 'uuid';

// const Doctor1 = sequelize.define('Doctor1', {
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
//     doctorId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         defaultValue: () => `DOC-${uuidv4().slice(0, 8)}` // Generates a unique doctor ID
//     }
// });

//export default Doctor1;
// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// import { v4 as uuidv4 } from "uuid";
// import { uuidToShort } from "../utils/shortId.js";

// const Doctor2= sequelize.define("Doctor2", {
//     doctor_id: {
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
//         validate: { isEmail: true },
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }, {
//     getterMethods: {
//         short_id() {
//             return uuidToShort(this.doctor_id); // Compute short ID dynamically
//         }
//     }
// });

// export default Doctor2;
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);

const Doctor= sequelize.define("Doctor", {
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