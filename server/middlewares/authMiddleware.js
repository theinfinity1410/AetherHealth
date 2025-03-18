import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const docMiddleware = (req, res, next) => {
    authMiddleware(req, res, () => {
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    });
};

export const patMiddleware = (req, res, next) => {
    authMiddleware(req, res, () => {
        if (req.user.role !== 'patient') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    });
};