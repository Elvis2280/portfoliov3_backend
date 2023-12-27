import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.SENDGRID);
sgMail.setApiKey(process.env.SENDGRID || '');

export default sgMail;
