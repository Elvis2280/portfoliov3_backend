import express from 'express';
import { sendMessage } from '../controllers/sendMessageControl';
import validate from '../utils/midlware/paramsValidation';
import { messageSchema } from '../utils/yupValidations/messageValidation';

const router = express.Router();

router.post('/send', validate(messageSchema), sendMessage);

export default router;
