import { Request, Response } from 'express';
import dotenv from 'dotenv';
import mailgunClient from '../utils/mailgunConn';
dotenv.config();

type sendMailSchema = {
  name: string;
  email: string;
  message: string;
};

const sendMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'elvismiranda924g@gmail.com',
    from: 'elvisdev2280@gmail.com',
    subject: 'Nuevo mensaje desde ElvisDev',
    html: `<h3>Mensaje de: ${name}</h3> <p>${message}</p> <p>From: ${email}</p>`,
  };

  mailgunClient.messages
    .create(process.env.MAILGUN_DOMAIN || '', msg)
    .then(() => {
      res.status(200).json({ message: 'Message sended!' });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ message: 'We got a problem, please try again!' });
    });
};

export { sendMessage };
