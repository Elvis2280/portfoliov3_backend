"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagekit_1 = __importDefault(require("imagekit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLICKEY ?? '',
    privateKey: process.env.IMAGEKIT_PRIVATEKEY ?? '',
    urlEndpoint: process.env.IMAGEKIT_URL ?? '',
});
exports.default = imagekit;
