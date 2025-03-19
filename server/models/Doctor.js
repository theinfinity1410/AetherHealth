import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { uuidToShort } from "../utils/shortId.js";

const Doctor = sequelize.define("Doctor", {
    doctor_id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
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
}, {
    getterMethods: {
        short_id() {
            return uuidToShort(this.doctor_id); // Compute short ID dynamically
        }
    }
});

export default Doctor;
