import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';

// types
type tagType = {
  name: string;
};

type tagId = {
  id: string;
};

// get all the tags
const getAllTags = async (req: Request, res: Response) => {
  try {
    const getTags = await prisma.tags.findMany();
    res.status(200).json({ tags: getTags });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

// post a tag
const addTag = async (req: Request<{}, {}, tagType, {}>, res: Response) => {
  const { name } = req.body;

  const checkTag = await prisma.tags.findFirst({
    where: {
      name: name,
    },
  });

  if (checkTag) {
    res.status(400).json({ message: `La etiqueta ${name} ya existe` });
  }

  try {
    const addTag = await prisma.tags.create({
      data: {
        name: name,
      },
    });
    res.status(200).json({ success: 'Tag creado' });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

// get delete a tag
const deleteTag = async (req: Request<{}, {}, {}, tagId>, res: Response) => {
  const { id } = req.query;
  try {
    const checkTag = await prisma.tags.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!checkTag) {
      res.status(404).json({ message: `La etiqueta ${id} no existe` });
    }

    const deleteTag = await prisma.tags.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json('Tag eliminado');
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

// update tag
const updateTag = async (
  req: Request<{}, {}, tagType, tagId>,
  res: Response,
) => {
  const { id } = req.query;
  const { name } = req.body;

  try {
    const checkTag = await prisma.tags.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!checkTag) {
      res.status(404).json({ message: `La etiqueta ${id} no existe` });
    }

    const updateTag = await prisma.tags.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    res.status(200).json({ success: 'Tag Actualizado' });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

export { getAllTags, addTag, deleteTag, updateTag };
