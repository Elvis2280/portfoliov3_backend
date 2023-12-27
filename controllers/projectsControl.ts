import { Request, Response } from 'express';
import imagekit from '../utils/imagekitConn';
import prisma from '../utils/prismaClient';
import { getProjectWithTags } from '../utils/projectHelpers/projectHelper';

// typescript types for API Params
type addProjectParams = {
  owner: string;
  title: string;
  description: string;
  content: string;
  img_portada: File;
  project_link: string;
  tags: string;
};

type deleteProjectParams = {
  id: string;
  owner: string;
};

type updateProjectParamsQuery = {
  id: string;
  owner: string;
};

type updateProjectParamsBody = {
  title: string;
  description: string;
  content: string;
  img_portada: string;
  project_link: string;
  tags: Array<object>;
};

// Get all the Projects

const getAllProjects = async (
  req: Request<{}, {}, {}, { owner: string }>,
  res: Response,
) => {
  const { owner } = req.query;
  if (!owner) return res.status(400).json({ message: 'owner is required' });

  try {
    const projects = await prisma.projects.findMany({
      where: {
        owner,
      },
    });

    const projectWithTags = await getProjectWithTags(projects);

    res.status(200).json({ data: projectWithTags });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectByTitle = async (
  req: Request<{}, {}, {}, { title: string }>,
  res: Response,
) => {
  const { title } = req.query;

  try {
    const tranformTitle = title.replaceAll('-', ' ');
    const getProject = await prisma.projects.findMany({
      where: {
        title: {
          equals: tranformTitle.toLocaleLowerCase(),
          mode: 'insensitive',
        },
      },
    });

    if (!getProject) {
      res.status(500).json({ message: 'No existen proyectos con este titulo' });
    } else {
      const projectWithTags = await getProjectWithTags(getProject);
      res.status(200).json(projectWithTags[0]);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get last 3 projects
const lastProjects = async (
  req: Request<{}, {}, {}, { owner: string }>,
  res: Response,
) => {
  const { owner } = req.query;
  try {
    const lastProjects = await prisma.projects.findMany({
      where: {
        owner,
      },
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
    });

    const projectWithTags = await getProjectWithTags(lastProjects);

    res.status(200).json(projectWithTags);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
};

// insert a project
const addProject = async (
  req: Request<{}, {}, addProjectParams, {}>,
  res: Response,
) => {
  const {
    owner,
    title,
    description,
    content,
    img_portada,
    project_link,
    tags,
  } = req.body;
  const arrTags = JSON.parse(tags);

  const checkProjectExist = await prisma.projects.findFirst({
    where: {
      title,
      owner,
    },
  });

  if (checkProjectExist) {
    return res.status(400).json({ message: 'Este proyecto ya existe' });
  }

  try {
    imagekit
      .upload({
        //@ts-ignore
        file: req.file.buffer, //required
        //@ts-ignore
        fileName: req.file.originalname, //required
        //@ts-ignore
        folder: `portfolio/${title.replaceAll(' ', '_')}`,
      })
      .then((result) => {
        (async function () {
          const saveProject = await prisma.projects.create({
            data: {
              owner,
              title,
              description,
              content,
              img_portada: result.url,
              project_link,
            },
          });

          const savedTags = await Promise.all(
            arrTags.map(async (tag: any) => {
              return await prisma.project_tags.create({
                data: {
                  project_id: saveProject.id,
                  tag_id: Number(tag),
                },
              });
            }),
          );

          res.status(200).json({ message: 'proyecto guardado' });
        })();
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: 'Ocurrió un problema al guardar la imagen' });
      });
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
};

// delete project by id

const deleteProject = async (
  req: Request<{}, {}, {}, deleteProjectParams>,
  res: Response,
) => {
  const { id } = req.query;
  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.projects.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ success: 'Proyecto eliminado' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// update project data

const updateProject = async (
  req: Request<{}, {}, updateProjectParamsBody, updateProjectParamsQuery>,
  res: Response,
) => {
  const { id, owner } = req.query;
  const { title, description, content, project_link } = req.body;

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: Number(id),
        owner,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.projects.update({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectByTitle,
  lastProjects,
};
