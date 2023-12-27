import express from 'express';
import {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectByTitle,
  lastProjects,
} from '../controllers/projectsControl';
import validate from '../utils/midlware/paramsValidation';
import {
  insertProyectSchema,
  deleteProjectSchema,
  updateProjectSchema,
  getByTitleSchema,
} from '../utils/yupValidations/projectValidation';
const router = express.Router();
const uploader = require('../utils/midlware/upload');

router.post('/add_project', uploader.single('img_portada'), addProject);
router.delete('/delete_project', validate(deleteProjectSchema), deleteProject);
router.patch('/update_project', validate(updateProjectSchema), updateProject);
router.get('/by_title', validate(getByTitleSchema), getProjectByTitle);
router.get('/last_projects', lastProjects);
router.get('/', getAllProjects);

export default router;

//  validate(insertProyectSchema),
