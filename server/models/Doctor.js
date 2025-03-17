import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const Doctor = sequelize.define('Doctor', {
    id: {
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
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => `DOC-${uuidv4().slice(0, 8)}` // Generates a unique doctor ID
    }
});

export default Doctor;