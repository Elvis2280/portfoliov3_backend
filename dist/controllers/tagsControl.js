"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTag = exports.deleteTag = exports.addTag = exports.getAllTags = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
// get all the tags
const getAllTags = async (req, res) => {
    try {
        const getTags = await prismaClient_1.default.tags.findMany();
        res.status(200).json({ tags: getTags });
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
exports.getAllTags = getAllTags;
// post a tag
const addTag = async (req, res) => {
    const { name } = req.body;
    const checkTag = await prismaClient_1.default.tags.findFirst({
        where: {
            name: name,
        },
    });
    if (checkTag) {
        res.status(400).json({ message: `La etiqueta ${name} ya existe` });
    }
    try {
        const addTag = await prismaClient_1.default.tags.create({
            data: {
                name: name,
            },
        });
        res.status(200).json({ success: 'Tag creado' });
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
exports.addTag = addTag;
// get delete a tag
const deleteTag = async (req, res) => {
    const { id } = req.query;
    try {
        const checkTag = await prismaClient_1.default.tags.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (!checkTag) {
            res.status(404).json({ message: `La etiqueta ${id} no existe` });
        }
        const deleteTag = await prismaClient_1.default.tags.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json('Tag eliminado');
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
exports.deleteTag = deleteTag;
// update tag
const updateTag = async (req, res) => {
    const { id } = req.query;
    const { name } = req.body;
    try {
        const checkTag = await prismaClient_1.default.tags.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (!checkTag) {
            res.status(404).json({ message: `La etiqueta ${id} no existe` });
        }
        const updateTag = await prismaClient_1.default.tags.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
            },
        });
        res.status(200).json({ success: 'Tag Actualizado' });
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
exports.updateTag = updateTag;
