"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastProjects = exports.getProjectByTitle = exports.updateProject = exports.deleteProject = exports.addProject = exports.getAllProjects = void 0;
const imagekitConn_1 = __importDefault(require("../utils/imagekitConn"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const projectHelper_1 = require("../utils/projectHelpers/projectHelper");
// Get all the Projects
const getAllProjects = async (req, res) => {
    const { owner } = req.query;
    if (!owner)
        return res.status(400).json({ message: 'owner is required' });
    try {
        const projects = await prismaClient_1.default.projects.findMany({
            where: {
                owner,
            },
        });
        const projectWithTags = await (0, projectHelper_1.getProjectWithTags)(projects);
        res.status(200).json({ data: projectWithTags });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllProjects = getAllProjects;
const getProjectByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const tranformTitle = title.replaceAll('-', ' ');
        const getProject = await prismaClient_1.default.projects.findMany({
            where: {
                title: {
                    equals: tranformTitle.toLocaleLowerCase(),
                    mode: 'insensitive',
                },
            },
        });
        if (!getProject) {
            res.status(500).json({ message: 'No existen proyectos con este titulo' });
        }
        else {
            const projectWithTags = await (0, projectHelper_1.getProjectWithTags)(getProject);
            res.status(200).json(projectWithTags[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProjectByTitle = getProjectByTitle;
// Get last 3 projects
const lastProjects = async (req, res) => {
    const { owner } = req.query;
    try {
        const lastProjects = await prismaClient_1.default.projects.findMany({
            where: {
                owner,
            },
            take: 3,
            orderBy: {
                created_at: 'desc',
            },
        });
        const projectWithTags = await (0, projectHelper_1.getProjectWithTags)(lastProjects);
        res.status(200).json(projectWithTags);
    }
    catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
exports.lastProjects = lastProjects;
// insert a project
const addProject = async (req, res) => {
    const { owner, title, description, content, img_portada, project_link, tags, } = req.body;
    const arrTags = JSON.parse(tags);
    const checkProjectExist = await prismaClient_1.default.projects.findFirst({
        where: {
            title,
            owner,
        },
    });
    if (checkProjectExist) {
        return res.status(400).json({ message: 'Este proyecto ya existe' });
    }
    try {
        imagekitConn_1.default
            .upload({
            //@ts-ignore
            file: req.file.buffer,
            //@ts-ignore
            fileName: req.file.originalname,
            //@ts-ignore
            folder: `portfolio/${title.replaceAll(' ', '_')}`,
        })
            .then((result) => {
            (async function () {
                const saveProject = await prismaClient_1.default.projects.create({
                    data: {
                        owner,
                        title,
                        description,
                        content,
                        img_portada: result.url,
                        project_link,
                    },
                });
                const savedTags = await Promise.all(arrTags.map(async (tag) => {
                    return await prismaClient_1.default.project_tags.create({
                        data: {
                            project_id: saveProject.id,
                            tag_id: Number(tag),
                        },
                    });
                }));
                res.status(200).json({ message: 'proyecto guardado' });
            })();
        })
            .catch((error) => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Ocurrió un problema al guardar la imagen' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
exports.addProject = addProject;
// delete project by id
const deleteProject = async (req, res) => {
    const { id } = req.query;
    try {
        const project = await prismaClient_1.default.projects.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await prismaClient_1.default.projects.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ success: 'Proyecto eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProject = deleteProject;
// update project data
const updateProject = async (req, res) => {
    const { id, owner } = req.query;
    const { title, description, content, project_link } = req.body;
    try {
        const project = await prismaClient_1.default.projects.findFirst({
            where: {
                id: Number(id),
                owner,
            },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await prismaClient_1.default.projects.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
                content,
                project_link,
            },
        });
        res.status(200).json({ sucess: 'Datos actualizados' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProject = updateProject;
