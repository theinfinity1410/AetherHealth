import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const Doctor = sequelize.define('Doctor', {
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
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     customValidator(value) {
        //         if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        //             throw new Error('Password must include one uppercase letter, one number, and one special character.');
        //         }
        //     },
        // }
    },
},
// {
//     hooks: {
//         beforeCreate: async (patient) => {
//             patient.password = await bcrypt.hash(patient.password, 10);
//         },
//         beforeUpdate: async (patient) => {
//             patient.password = await bcrypt.hash(patient.password, 10);
//         },
//     },
// }
);

export default Doctor;
