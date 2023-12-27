import * as yup from 'yup';
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

const deleteProjectSchema = yup.object({
  query: yup.object({
    id: yup.string().required(),
  }),
});

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

const getByTitleSchema = yup.object({
  query: yup.object({
    title: yup.string().required(),
  }),
});

export {
  insertProyectSchema,
  deleteProjectSchema,
  updateProjectSchema,
  getByTitleSchema,
};
