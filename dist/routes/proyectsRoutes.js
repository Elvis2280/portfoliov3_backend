"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectsControl_1 = require("../controllers/projectsControl");
const paramsValidation_1 = __importDefault(require("../utils/midlware/paramsValidation"));
const projectValidation_1 = require("../utils/yupValidations/projectValidation");
const router = express_1.default.Router();
const uploader = require('../utils/midlware/upload');
router.post('/add_project', uploader.single('img_portada'), projectsControl_1.addProject);
router.delete('/delete_project', (0, paramsValidation_1.default)(projectValidation_1.deleteProjectSchema), projectsControl_1.deleteProject);
router.patch('/update_project', (0, paramsValidation_1.default)(projectValidation_1.updateProjectSchema), projectsControl_1.updateProject);
router.get('/by_title', (0, paramsValidation_1.default)(projectValidation_1.getByTitleSchema), projectsControl_1.getProjectByTitle);
router.get('/last_projects', projectsControl_1.lastProjects);
router.get('/', projectsControl_1.getAllProjects);
exports.default = router;
//  validate(insertProyectSchema),
