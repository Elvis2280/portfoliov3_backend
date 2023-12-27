import { project_tags, projects } from '@prisma/client';
import prisma from '../prismaClient';

export const getProjectWithTags = async (project: projects[]) => {
  const projectWithTags = await Promise.all(
    project.map(async (project: projects) => {
      const projectTags = await prisma.project_tags.findMany({
        where: {
          project_id: project.id,
        },
      });

      const tags = await Promise.all(
        projectTags.map(async (tag: project_tags) => {
          const tagData = await prisma.tags.findUnique({
            where: {
              id: Number(tag.tag_id),
            },
          });
          return tagData;
        }),
      );
      //@ts-ignore
      project.tags = tags;
      return project;
    }),
  );
  return projectWithTags;
};
