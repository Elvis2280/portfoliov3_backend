import { Interfaces } from 'mailgun.js';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mailgunClient: Interfaces.IMailgunClient = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export default mailgunClient;
