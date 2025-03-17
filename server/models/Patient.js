import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import Doctor from './Doctor.js';

const Patient = sequelize.define('Patient', {
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
    patientId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => `PAT-${uuidv4().slice(0, 8)}` // Generates unique Patient ID
    },
    doctorId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Doctor, // Linking to the Doctor model
            key: 'doctorId'
        }
    }
});

export default Patient;