import express from 'express';
import { sequelize } from './config/db.js'; // Correct import
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');

// Initialize dotenv
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/patient', patientRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// ... existing code ...

app.get('/', (req, res) => {
    console.log(`Server is up and running on ${process.env.PORT}`);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log("Testing the database connection...");
        await sequelize.authenticate(); 
        await sequelize.sync({ alter: true });
        console.log("✅ Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        process.exit(1);
    }
};

startServer();