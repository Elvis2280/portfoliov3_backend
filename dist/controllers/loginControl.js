"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fecthSessionLog = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const tryLogin = await prismaClient_1.default.users.findFirst({
            where: {
                email: email,
            },
        });
        if (!tryLogin) {
            res
                .status(400)
                .json({ message: 'Este email no existe en nuestra base de datos' });
        }
        else {
            const matchPass = bcrypt_1.default.compareSync(password, tryLogin.user_password);
            if (!matchPass) {
                throw Error('La contraseña no es valida');
            }
            // @ts-ignore
            req.session.user = {
                usuario: tryLogin.nombre,
                user_id: tryLogin.id,
            };
            res.status(200).json({
                user_id: tryLogin.id,
                user_name: tryLogin.nombre,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        await req.session.destroy(() => { });
        res.status(200).json({ message: 'Sesión terminada, hasta luego' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ocurrio un problema al cerrar sesión' });
    }
};
exports.logout = logout;
const fecthSessionLog = async (req, res) => {
    // @ts-ignore
    if (req.sessionID) {
        // @ts-ignore
        return res.status(200).json({ data: req.session.user });
    }
    else {
        return res.status(403).json({ message: 'No se pudo autenticar' });
    }
};
exports.fecthSessionLog = fecthSessionLog;
