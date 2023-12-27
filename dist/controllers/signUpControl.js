"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const signUp = async (req, res) => {
    const { nombre, password, email } = req.body;
    try {
        const checkUserbyEmail = await prismaClient_1.default.users.findFirst({
            where: {
                email: email,
            },
        });
        if (checkUserbyEmail) {
            throw Error(`El email ${email} ya esta registrado`);
        }
        else {
            const salt = await bcrypt_1.default.genSalt(10);
            const hash = await bcrypt_1.default.hash(password, salt);
            const addUser = await prismaClient_1.default.users.create({
                data: {
                    nombre: nombre,
                    email: email,
                    user_password: hash,
                },
            });
            res.status(200).json({ message: 'Usuario creado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
exports.signUp = signUp;
