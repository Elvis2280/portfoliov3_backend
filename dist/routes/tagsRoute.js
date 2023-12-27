"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagsControl_1 = require("../controllers/tagsControl");
const paramsValidation_1 = __importDefault(require("../utils/midlware/paramsValidation"));
const tagsValidation_1 = require("../utils/yupValidations/tagsValidation");
const router = express_1.default.Router();
router.get('/', tagsControl_1.getAllTags);
router.post('/add_tag', (0, paramsValidation_1.default)(tagsValidation_1.insertTagSchema), tagsControl_1.addTag);
router.delete('/delete_tag', (0, paramsValidation_1.default)(tagsValidation_1.deleteTagSchema), tagsControl_1.deleteTag);
router.patch('/update_tag', (0, paramsValidation_1.default)(tagsValidation_1.updateTagSchema), tagsControl_1.updateTag);
exports.default = router;
