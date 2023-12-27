import * as yup from 'yup';
const insertTagSchema = yup.object({
  body: yup.object({
    name: yup.string().required().uppercase(),
  }),
});

const deleteTagSchema = yup.object({
  query: yup.object({
    id: yup.string().required(),
  }),
});

const updateTagSchema = yup.object({
  query: yup.object({
    id: yup.string().required(),
  }),
  body: yup.object({
    name: yup.string().required().uppercase(),
  }),
});

export { insertTagSchema, deleteTagSchema, updateTagSchema };
