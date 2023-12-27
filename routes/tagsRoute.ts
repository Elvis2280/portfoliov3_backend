import express from 'express';
import {
  addTag,
  deleteTag,
  getAllTags,
  updateTag,
} from '../controllers/tagsControl';
import validate from '../utils/midlware/paramsValidation';
import {
  deleteTagSchema,
  insertTagSchema,
  updateTagSchema,
} from '../utils/yupValidations/tagsValidation';

const router = express.Router();

router.get('/', getAllTags);
router.post('/add_tag', validate(insertTagSchema), addTag);
router.delete('/delete_tag', validate(deleteTagSchema), deleteTag);
router.patch('/update_tag', validate(updateTagSchema), updateTag);
export default router;
