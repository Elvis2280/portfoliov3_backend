"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginControl_1 = require("../controllers/loginControl");
const paramsValidation_1 = __importDefault(require("../utils/midlware/paramsValidation"));
const loginValidation_1 = require("../utils/yupValidations/loginValidation");
const router = express_1.default.Router();
router.post('/', (0, paramsValidation_1.default)(loginValidation_1.tryLoginSchema), loginControl_1.login);
router.post('/logout', loginControl_1.logout);
router.post('/check_session', loginControl_1.fecthSessionLog);
exports.default = router;
