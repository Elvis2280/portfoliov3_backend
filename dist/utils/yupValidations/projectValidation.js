"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByTitleSchema = exports.updateProjectSchema = exports.deleteProjectSchema = exports.insertProyectSchema = void 0;
const yup = __importStar(require("yup"));
const insertProyectSchema = yup.object({
    body: yup.object({
        user_id: yup.string().required(),
        title: yup.string().required(),
        description: yup.string().required(),
        content: yup.string().required(),
        img_portada: yup.mixed().required(),
        project_link: yup.string().url().required(),
        tags: yup.string(),
    }),
});
exports.insertProyectSchema = insertProyectSchema;
const deleteProjectSchema = yup.object({
    query: yup.object({
        id: yup.string().required(),
    }),
});
exports.deleteProjectSchema = deleteProjectSchema;
const updateProjectSchema = yup.object({
    query: yup.object({
        id: yup.string().required(),
    }),
    body: yup.object({
        title: yup.string(),
        description: yup.string(),
        content: yup.string(),
        project_link: yup.string().url(),
    }),
});
exports.updateProjectSchema = updateProjectSchema;
const getByTitleSchema = yup.object({
    query: yup.object({
        title: yup.string().required(),
    }),
});
exports.getByTitleSchema = getByTitleSchema;
