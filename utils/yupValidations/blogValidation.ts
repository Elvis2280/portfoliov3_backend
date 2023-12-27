import * as yup from 'yup';
const addBlogSchema = yup.object({
  body: yup.object({
    user_id: yup.number().positive().required().integer(),
    title: yup.string().required().min(8),
    description: yup.string().required().min(8),
    content: yup.string().required().min(8),
    tags: yup.array(),
  }),
});

export { addBlogSchema };
