"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {
//   addArticle,
//   deleteArticle,
//   getAllArticles,
//   updateArticle,
// } from '../controllers/blogsControl';
// import validate from '../utils/midlware/paramsValidation';
// import { addBlogSchema } from '../utils/yupValidations/blogValidation';
const router = express_1.default.Router();
// router.get('/', getAllArticles);
// router.delete('/delete_article', deleteArticle);
// router.post('/addArticle', validate(addBlogSchema), addArticle);
// router.patch('/update_article', validate(addBlogSchema), updateArticle);
exports.default = router;
