import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            customValidator(value) {
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                    throw new Error('Password must include one uppercase letter, one number, and one special character.');
                }
            },
        }
    },
    role:{
        type: DataTypes.ENUM('patient', 'doctor'),
        defaultValue: 'patient',
        allowNull : false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]{10}$/i,
            isNumeric: true
        }
    },
    gender: {
        type: DataTypes.ENUM('male','female','others'),
        defaultValue: 'male',
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});

export default User;