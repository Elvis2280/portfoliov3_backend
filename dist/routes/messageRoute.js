"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendMessageControl_1 = require("../controllers/sendMessageControl");
const paramsValidation_1 = __importDefault(require("../utils/midlware/paramsValidation"));
const messageValidation_1 = require("../utils/yupValidations/messageValidation");
const router = express_1.default.Router();
router.post('/send', (0, paramsValidation_1.default)(messageValidation_1.messageSchema), sendMessageControl_1.sendMessage);
exports.default = router;
