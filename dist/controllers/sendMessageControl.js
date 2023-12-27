"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mailgunConn_1 = __importDefault(require("../utils/mailgunConn"));
dotenv_1.default.config();
const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    const msg = {
        to: 'elvismiranda924g@gmail.com',
        from: 'elvisdev2280@gmail.com',
        subject: 'Nuevo mensaje desde ElvisDev',
        html: `<h3>Mensaje de: ${name}</h3> <p>${message}</p> <p>From: ${email}</p>`,
    };
    mailgunConn_1.default.messages
        .create(process.env.MAILGUN_DOMAIN || '', msg)
        .then(() => {
        res.status(200).json({ message: 'Message sended!' });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'We got a problem, please try again!' });
    });
};
exports.sendMessage = sendMessage;
