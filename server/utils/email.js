import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // True for port 465, false for others
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email using Nodemailer.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text email content
 */
export const sendEmail = async ({ to, subject, text }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};
